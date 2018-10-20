import executeCommand from '../executeCommand';
import { spliceFromCache } from '../../cache';

async function deleteRegularNpmDependency(req) {
  const { projectPath } = req.params;
  const { packageName } = req.body;

  // delete
  await executeCommand(projectPath, `npm uninstall ${packageName}@${req.body.packageVersion || ''} -S`, true);

  return packageName;
}

async function deleteRegularBowerDependency(req) { // eslint-disable-line

}

async function deleteDevNpmDependency(req) {
  const { projectPath } = req.params;
  const { packageName } = req.body;

  // delete
  await executeCommand(projectPath, `npm uninstall ${packageName}@${req.body.packageVersion || ''} -D`, true);

  return packageName;
}

async function deleteDevBowerDependency(req) { // eslint-disable-line

}

export async function deleteRegularDependencies(req, res) {
  const npmCacheName = `${req.params.projectPath}-npmRegular`;
  const bowerCacheName = `${req.params.projectPath}-bowerRegular`;

  if (req.params.repoName === 'npm') {
    const dependencyName = await deleteRegularNpmDependency(req);
    spliceFromCache(npmCacheName, dependency => dependency.name === dependencyName);
  } else if (req.params.repoName === 'bower') {
    const dependencyName = await deleteRegularBowerDependency(req);
    spliceFromCache(bowerCacheName, dependency => dependency.name === dependencyName);
  }

  res.json({});
}

export async function deleteDevDependencies(req, res) {
  const npmCacheName = `${req.params.projectPath}-npmDev`;
  const bowerCacheName = `${req.params.projectPath}-bowerDev`;

  if (req.params.repoName === 'npm') {
    const dependencyName = await deleteDevNpmDependency(req);
    spliceFromCache(npmCacheName, dependency => dependency.name === dependencyName);
  } else if (req.params.repoName === 'bower') {
    const dependencyName = await deleteDevBowerDependency(req);
    spliceFromCache(bowerCacheName, dependency => dependency.name === dependencyName);
  }

  res.json({});
}
