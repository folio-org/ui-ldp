import baseName from './baseName';
import { createReportRepo } from './repoTypes';


// In the unlikely event that performance becomes a problem here, we
// could further parallelize the operations by starting each repo's
// file-download operations as soon as its directory is loaded, rather
// than loading all the directories first. For now, simpler is better,
// so we just fetch all the directories, then all the files.
//
async function fetchTemplatedQueryFilenames(gitRepos) {
  const promises = gitRepos.map(config => {
    const reportRepo = createReportRepo(config);
    const path = reportRepo.apiDirectoryPath();
    return fetch(path);
  });

  const results = await Promise.all(promises);
  const resultsWithConfig = results.map((result, i) => ({
    config: gitRepos[i],
    result,
  }));

  const failed = resultsWithConfig.filter(rc => !rc.result.ok);
  if (failed.length !== 0) {
    const reportRepo = createReportRepo(failed[0].config);
    const path = reportRepo.apiDirectoryPath();
    const result = failed[0].result;
    const text = await result.text();
    throw new Error(`could not load templated queries from ${path}: ${result.status} ${result.statusText} (${text})`);
  }

  const promises2 = results.map(result => result.json());
  const jsons = await Promise.all(promises2);
  const filenameListsWithConfig = resultsWithConfig.map((rc, i) => ({
    filenames: jsons[i].map(x => x.name).filter(x => x.endsWith('.sql') || x.endsWith('.json')),
    config: rc.config,
  }));

  const filenamesWithConfig = [];
  filenameListsWithConfig.forEach(fc => {
    fc.filenames.forEach(filename => {
      filenamesWithConfig.push({ filename, config: fc.config });
    });
  });

  return filenamesWithConfig;
}


function mergeSQLandJSON(data) {
  const jsonRegister = {};
  data.forEach(entry => {
    if (entry.filename.endsWith('.json')) {
      const qn = baseName(entry.filename);
      jsonRegister[qn] = JSON.parse(entry.text);
    }
  });

  return data
    .filter(entry => entry.filename.endsWith('.sql'))
    .map(entry => {
      const qn = baseName(entry.filename);
      return { ...entry, json: jsonRegister[qn] };
    });
}


async function fetchTemplatedQueries(gitRepos, setQueries) {
  const filenamesWithConfig = await fetchTemplatedQueryFilenames(gitRepos);

  const promises = filenamesWithConfig.map(fc => {
    const reportRepo = createReportRepo(fc.config);
    const path = reportRepo.rawFilePath(fc.filename);
    return fetch(path);
  });

  const results = await Promise.all(promises);
  const resultsWithFC = results.map((result, i) => ({
    ...filenamesWithConfig[i],
    result,
  }));

  const failed = resultsWithFC.filter(rfc => !rfc.result.ok);
  if (failed.length !== 0) {
    const reportRepo = createReportRepo(failed[0].config);
    const path = reportRepo.rawFilePath(failed[0].filename);
    const result = failed[0].result;
    const text = await result.text();
    throw new Error(`could not load templated query ${path}: ${result.status} ${result.statustext} (${text})`);
  }

  const promises2 = results.map(result => result.text());
  const texts = await Promise.all(promises2);
  const data = resultsWithFC.map((rfc, i) => ({
    filename: rfc.filename,
    config: rfc.config,
    text: texts[i],
  }));

  const merged = mergeSQLandJSON(data);
  const withMetadata = merged.filter(x => x.json);
  withMetadata.sort((a, b) => a.json?.displayName.localeCompare(b.json?.displayName));
  setQueries(withMetadata);
}


export default fetchTemplatedQueries;
