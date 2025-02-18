// eslint-disable-next-line max-classes-per-file
class QueryRepo {
  constructor(user, repo, branch, dir) {
    this.user = user;
    this.repo = repo;
    this.branch = branch;
    this.dir = (dir === undefined || dir === '/') ? '.' : dir;
  }
}

class QueryRepoGitHub extends QueryRepo {
  static name() { return 'GitHub'; }
  webUrl() { return `https://github.com/${this.user}/${this.repo}/tree/${this.branch}/${this.dir}`; }
  apiDirectoryPath() { return `https://api.github.com/repos/${this.user}/${this.repo}/git/trees/${this.branch}?recursive=1`; }
  mapApiResponse(res) {
    // Unlike the response to the old fetch-a-single-directory WSAPI
    // call, the tree call returns the list of entries within a `tree`
    // subrecord. it also has no `name` entry, so we populate from
    // that `parh`; and since there is no parameter to specify where
    // in the repo to start the root of the tree, we need to filter
    // the complete tree to include only the relevant entries.
    return res.tree.map(e => ({ ...e, name: e.path })).filter(e => this.dir === '.' || e.name.startsWith(this.dir));
  }

  rawFilePath(name) { return `https://raw.githubusercontent.com/${this.user}/${this.repo}/${this.branch}/${name}`; }
  urlBase(filename) { return `${this.webUrl()}/${filename}`; }
}

class QueryRepoGitLab extends QueryRepo {
  static name() { return 'GitLab'; }
  webUrl() { return `https://gitlab.com/${this.user}/${this.repo}/tree/${this.branch}/${this.dir}`; }
  apiDirectoryPath() { return `https://gitlab.com/api/v4/projects/${this.user}%2F${this.repo}/repository/tree?ref=${this.branch}&path=${this.dir}`; }
  mapApiResponse(res) { return res; }

  rawFilePath(name) {
    const encodedPath = encodeURIComponent(`${this.dir}/${name}`);
    return `https://gitlab.com/api/v4/projects/${this.user}%2F${this.repo}/repository/files/${encodedPath}/raw?ref=${this.branch}`;
  }

  urlBase(filename) { return `${this.webUrl()}/${filename}`; }
}

const repoTypes = {
  github: QueryRepoGitHub,
  gitlab: QueryRepoGitLab,
  // More as we need them
};

function createReportRepo(config) {
  const ReportRepoType = repoTypes[config.type || 'github'];
  const reportRepo = new ReportRepoType(config.user, config.repo, config.branch, config.dir);
  return reportRepo;
}

export { repoTypes, createReportRepo };
