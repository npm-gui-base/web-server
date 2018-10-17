import fs from 'fs';

import executeCommand from '../executeCommand';
import UtilsService from '../../service/utils/utils.service';
import { spliceFromCache } from '../../cache';

async function deleteRegularNpmDependency(req) {
  const projectPath = req.params.projectPath;
  const packageName = req.params.packageName;

  // delete
  await executeCommand(projectPath,
      `npm uninstall ${packageName}@${req.body.packageVersion || ''} -S`);

  return packageName;
}

async function deleteRegularBowerDependency(req) {

}

async function deleteDevNpmDependency(req) {
  const projectPath = req.params.projectPath;
  const packageName = req.params.packageName;

  // delete
  await executeCommand(projectPath,
      `npm uninstall ${packageName}@${req.body.packageVersion || ''} -D`);

  return packageName;
}

async function deleteDevBowerDependency(req) {

}

export async function deleteRegularDependencies(req, res) {
  const npmCacheName = `${req.params.projectPath}-npmRegular`;
  const bowerCacheName = `${req.params.projectPath}-bowerRegular`;

  if (req.params.repoName === 'npm') {
    const dependencyName = await deleteRegularNpmDependency(req);
    spliceFromCache(npmCacheName, (dependency) => dependency.name === dependencyName);
  } else if (req.params.repoName === 'bower') {
    const dependencyName = await deleteRegularBowerDependency(req);
    spliceFromCache(bowerCacheName, (dependency) => dependency.name === dependencyName);
  }

  res.json({});
}

export async function deleteDevDependencies(req, res) {
  const npmCacheName = `${req.params.projectPath}-npmDev`;
  const bowerCacheName = `${req.params.projectPath}-bowerDev`;

  if (req.params.repoName === 'npm') {
    const dependencyName = await deleteDevNpmDependency(req);
    spliceFromCache(npmCacheName, (dependency) => dependency.name === dependencyName);
  } else if (req.params.repoName === 'bower') {
    const dependencyName = await deleteDevBowerDependency(req);
    spliceFromCache(bowerCacheName, (dependency) => dependency.name === dependencyName);
  }

  res.json({});
}
