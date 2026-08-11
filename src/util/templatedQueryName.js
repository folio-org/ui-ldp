import baseName from './baseName';

// The filename is already relative to the root of the repository --
// both repository types populate it from the path of the tree entry
// -- so it includes the configured directory {q.config.dir}, and we
// need not repeat it.
//
export default function templatedQueryName(q) {
  return `${q.config.user}/${q.config.repo}/${q.config.branch}/${baseName(q.filename)}`;
}
