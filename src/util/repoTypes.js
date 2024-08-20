// eslint-disable-next-line max-classes-per-file
class QueryRepo {
  constructor(user, repo, branch, dir) {
    this.user = user;
    this.repo = repo;
    this.branch = branch;
    this.dir = dir;
  }
}

class QueryRepoGitHub extends QueryRepo {
  static name() { return 'GitHub'; }
  webUrl() { return `https://github.com/${this.user}/${this.repo}/tree/${this.branch}/${this.dir}`; }
  apiDirectoryPath() { return `https://api.github.com/repos/${this.user}/${this.repo}/contents/${this.dir}?ref=${this.branch}`; }
  rawFilePath(name) { return `https://raw.githubusercontent.com/${this.user}/${this.repo}/${this.branch}/${this.dir}/${name}`; }
  transformData(data) { return data; }
  urlBase(filename) { return `${this.webUrl()}/${filename}`; }
}

class QueryRepoGitLab extends QueryRepo {
  static name() { return 'GitLab'; }
  webUrl() { return `https://gitlab.com/${this.user}/${this.repo}/tree/${this.branch}/${this.dir}`; }
  apiDirectoryPath() { return `https://gitlab.com/api/v4/projects/${this.user}%2F${this.repo}/repository/tree?ref=${this.branch}&path=${this.dir}`; }

  rawFilePath(name) {
    const encodedPath = encodeURIComponent(`${this.dir}/${name}`);
    return `https://gitlab.com/api/v4/projects/${this.user}%2F${this.repo}/repository/files/${encodedPath}/raw?ref=${this.branch}`;
  }

  transformData(data) { return data; }
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
