import path from 'path';
import fs from 'fs';

export async function explorer(req, res) {
  const normalizedPath = path.normalize(req.params.path ? `/${req.params.path}` : process.cwd());

  const ls = fs.readdirSync(normalizedPath)
    .map(name => ({
      isDirectory: fs.lstatSync(`${normalizedPath}/${name}`).isDirectory(),
      name,
    }));

  res.json({
    path: normalizedPath,
    ls,
  });
}
