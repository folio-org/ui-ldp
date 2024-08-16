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
  urlBase(filename) { return `${this.webUrl()}/${filename}`; }
}

// Yes, this is very similar to the GitHub class, but we may need to diverge significantly
class QueryRepoGitLab extends QueryRepo {
  static name() { return 'GitLab'; }
  webUrl() { return `https://gitlab.com/${this.user}/${this.repo}/tree/${this.branch}/${this.dir}`; }
  apiDirectoryPath() { return `https://api.gitlab.com/repos/${this.user}/${this.repo}/contents/${this.dir}?ref=${this.branch}`; }
  urlBase(filename) { return `${this.webUrl()}/${filename}`; }
}

const repoTypes = {
  github: QueryRepoGitHub,
  gitlab: QueryRepoGitLab,
  // More as we need them
};

function makeReportRepo(type, user, repo, branch, dir) {
  const ReportRepoType = repoTypes[type || 'github'];
  const reportRepo = new ReportRepoType(user, repo, branch, dir);
  return reportRepo;
}

export { repoTypes, makeReportRepo };
