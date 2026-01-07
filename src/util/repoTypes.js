// eslint-disable-next-line max-classes-per-file
class QueryRepo {
  constructor(baseUrl, user, repo, branch, dir) {
    this.baseUrl = baseUrl;
    this.user = user;
    this.repo = repo;
    this.branch = branch;
    this.dir = (dir === undefined || dir === '/') ? '.' : dir;
  }
}

// PRIVATE to class QueryRepoGitHub
// Maps user:repo:branch to commit SHA
const _latestCommitOnBranch = {};

class QueryRepoGitHub extends QueryRepo {
  static name() { return 'GitHub'; }
  webUrl() { return `https://github.com/${this.user}/${this.repo}/tree/${this.branch}/${this.dir}`; }
  apiDirectoryPath() {
    // We send a dummy always-different parameter `t` in an attempt to defeat caching
    return `https://api.github.com/repos/${this.user}/${this.repo}/git/trees/${this.branch}?recursive=1&t=${Date.now()}`;
  }

  _key() { return `${this.user}:${this.repo}:${this.branch}`; } // PRIVATE, not part of API
  mapApiResponse(res) {
    // Side-effect: we remember the SHA1 for this tree, so we can use it later in rawFilePath
    _latestCommitOnBranch[this._key()] = res.sha;

    // Unlike the response to the old fetch-a-single-directory WSAPI
    // call, the tree call returns the list of entries within a `tree`
    // subrecord. it also has no `name` entry, so we populate from
    // that `path`; and since there is no parameter to specify where
    // in the repo to start the root of the tree, we need to filter
    // the complete tree to include only the relevant IDentries.
    const dir = this.dir.endsWith('/') ? this.dir : this.dir + '/';
    return res.tree.map(e => ({ ...e, name: e.path })).filter(e => this.dir === '.' || e.name.startsWith(dir));
  }

  rawFilePath(name) {
    const sha = _latestCommitOnBranch[this._key()];
    return `https://raw.githubusercontent.com/${this.user}/${this.repo}/${sha}/${name}`;
  }

  urlBase(filename) { return `https://github.com/${this.user}/${this.repo}/tree/${this.branch}/${filename}`; }
  showBaseUrl() { return false; }
}

class QueryRepoGitLab extends QueryRepo {
  static name() { return 'GitLab'; }
  webUrl() { return `${this.baseUrl || 'https://gitlab.com'}/${this.user}/${this.repo}/tree/${this.branch}/${this.dir}`; }
  apiDirectoryPath() { return `${this.baseUrl || 'https://gitlab.com'}/api/v4/projects/${this.user}%2F${this.repo}/repository/tree?ref=${this.branch}&path=${this.dir}&recursive=true`; }
  mapApiResponse(res) { return res.filter(e => e.type === 'blob').map(e => ({ ...e, name: e.path })); }

  rawFilePath(name) {
    const encodedPath = encodeURIComponent(`${name}`);
    return `${this.baseUrl || 'https://gitlab.com'}/api/v4/projects/${this.user}%2F${this.repo}/repository/files/${encodedPath}/raw?ref=${this.branch}`;
  }

  urlBase(filename) { return `${this.baseUrl || 'https://gitlab.com'}/${this.user}/${this.repo}/tree/${this.branch}/${filename}`; }
  showBaseUrl() { return true; }
}

const repoTypes = {
  github: QueryRepoGitHub,
  gitlab: QueryRepoGitLab,
  // More as we need them
};

function createReportRepo(config) {
  const ReportRepoType = repoTypes[config.type || 'github'];
  const reportRepo = new ReportRepoType(config.baseUrl, config.user, config.repo, config.branch, config.dir);
  return reportRepo;
}

export { repoTypes, createReportRepo };
