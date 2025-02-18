import baseName from './baseName';

export default function templatedQueryName(q) {
  return `${q.config.user}/${q.config.repo}/${q.config.branch}/${q.config.dir}/${baseName(q.filename)}`;
}
