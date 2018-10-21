import executeCommand from '../executeCommand';
import UtilsService from '../../service/utils/utils.service';
import { mapNpmDependency } from '../mapDependencies';
import { updateInCache } from '../../cache';

async function addGlobalNpmDependency(req) {
  const { name, version } = req.body;

  // add
  await executeCommand(null, `npm install ${name}@${version || ''} -g`, true);

  // get package info
  const commandLsResult = await executeCommand(null, `npm ls ${name} --depth=0 -g --json`);
  const { dependencies } = UtilsService.parseJSON(commandLsResult.stdout);

  const commandOutdtedResult = await executeCommand(null, `npm outdated ${name} -g --json`);
  const versions = UtilsService.parseJSON(commandOutdtedResult.stdout) || { versions: [] };

  return mapNpmDependency(
    name,
    dependencies[name],
    versions[name],
    dependencies[name].version,
  );
}


async function addGlobalBowerDependency(req) { // eslint-disable-line

}

export async function addGlobalDependencies(req, res) {
  const npmCacheName = 'global-npmGlobal';
  const bowerCacheName = 'global-bowerGlobal';

  if (req.params.repoName === 'npm') {
    const dependencyInfo = await addGlobalNpmDependency(req);
    updateInCache(npmCacheName, dependencyInfo, 'name');
  } else if (req.params.repoName === 'bower') {
    const dependencyInfo = await addGlobalBowerDependency(req);
    updateInCache(bowerCacheName, dependencyInfo, 'name');
  }

  res.json({});
}
