import fs from 'fs';

import executeCommand from '../executeCommand';
import UtilsService from '../../service/utils/utils.service';
import { pushToCache } from '../../cache';
import { mapNpmDependency, mapBowerDependency } from './mapDependencies';


async function addRegularNpmDependency(req) {
  const projectPath = req.params.projectPath;
  const packageName = req.body.packageName;

  // add
  await executeCommand(projectPath,
      `npm install ${packageName}@${req.body.packageVersion || ''} -S`);

  // get package info
  const commandLsResult = await executeCommand(
    req.params.projectPath, `npm ls ${packageName} --depth=0 --json`);
  const { dependencies } = UtilsService.parseJSON(commandLsResult.stdout);

  const commandOutdtedResult = await executeCommand(
    req.params.projectPath, `npm outdated ${packageName} --json`);
  const versions = UtilsService.parseJSON(commandOutdtedResult.stdout) || { versions: [] };

  const packageJson =
    UtilsService.parseJSON(fs.readFileSync(`${req.params.projectPath}/package.json`, 'utf-8'));

  return mapNpmDependency(
    packageName,
    dependencies[packageName],
    versions[packageName],
    packageJson.dependencies[packageName],
  );
}

async function addRegularBowerDependency(req) {

}

async function addDevNpmDependency(req) {
  const projectPath = req.params.projectPath;
  const packageName = req.body.packageName;

  // add
  await executeCommand(projectPath,
      `npm install ${packageName}@${req.body.packageVersion || ''} -D`);

  // get package info
  const commandLsResult = await executeCommand(
    req.params.projectPath, `npm ls ${packageName} --depth=0 --json`);
  const { dependencies } = UtilsService.parseJSON(commandLsResult.stdout);

  const commandOutdtedResult = await executeCommand(
    req.params.projectPath, `npm outdated ${packageName} --json`);
  const versions = UtilsService.parseJSON(commandOutdtedResult.stdout) || { versions: [] };

  const packageJson =
    UtilsService.parseJSON(fs.readFileSync(`${req.params.projectPath}/package.json`, 'utf-8'));

  return mapNpmDependency(
    packageName,
    dependencies[packageName],
    versions[packageName],
    packageJson.devDependencies[packageName],
  );
}

async function addDevBowerDependency(req) {

}

export async function addRegularDependencies(req, res) {
  const npmCacheName = `${req.params.projectPath}-npmRegular`;
  const bowerCacheName = `${req.params.projectPath}-bowerRegular`;

  if (req.params.repoName === 'npm') {
    const dependencyInfo = await addRegularNpmDependency(req);
    pushToCache(npmCacheName, dependencyInfo);
  } else if (req.params.repoName === 'bower') {
    const dependencyInfo = await addRegularBowerDependency(req);
    pushToCache(bowerCacheName, dependencyInfo);
  }

  res.json({});
}

export async function addDevDependencies(req, res) {
  const npmCacheName = `${req.params.projectPath}-npmDev`;
  const bowerCacheName = `${req.params.projectPath}-bowerDev`;

  if (req.params.repoName === 'npm') {
    const dependencyInfo = await addDevNpmDependency(req);
    pushToCache(npmCacheName, dependencyInfo);
  } else if (req.params.repoName === 'bower') {
    const dependencyInfo = await addDevBowerDependency(req);
    pushToCache(bowerCacheName, dependencyInfo);
  }

  res.json({});
}
