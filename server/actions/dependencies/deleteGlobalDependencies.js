import executeCommand from '../executeCommand';
import { spliceFromCache } from '../../cache';

async function deleteGlobalNpmDependency(req) {
  const { name } = req.params;
  // delete
  await executeCommand(null, `npm uninstall ${name} -g`, true);

  return name;
}

async function deleteGlobalBowerDependency(req) { // eslint-disable-line

}

export async function deleteGlobalDependencies(req, res) {
  const npmCacheName = 'global-npmGlobal';
  const bowerCacheName = 'global-bowerGlobal';

  if (req.params.repoName === 'npm') {
    const name = await deleteGlobalNpmDependency(req);
    spliceFromCache(npmCacheName, { name }, 'name');
  } else if (req.params.repoName === 'bower') {
    const name = await deleteGlobalBowerDependency(req);
    spliceFromCache(bowerCacheName, { name }, 'name');
  }

  res.json({});
}
