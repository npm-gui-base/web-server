import fs from 'fs';

import executeCommand from '../executeCommand';
import UtilsService from '../../service/utils/utils.service';
import { getFromCache, putToCache } from '../../cache';
import { mapNpmDependency, mapBowerDependency } from './mapDependencies';


async function getRegularNpmDependencies(req) {
  const commandLsResult = await executeCommand(
    req.params.projectPath, 'npm ls --depth=0 --json -prod');
  const { dependencies } = UtilsService.parseJSON(commandLsResult.stdout);

  const commandOutdtedResult = await executeCommand(
    req.params.projectPath, 'npm outdated --json -prod');
  const versions = UtilsService.parseJSON(commandOutdtedResult.stdout);

  const packageJson =
    JSON.parse(fs.readFileSync(`${req.params.projectPath}/package.json`, 'utf-8'));

  return Object.keys(dependencies)
    .map(name => mapNpmDependency(
      name,
      dependencies[name],
      versions[name],
      packageJson.dependencies[name],
    ));
}

async function getDevNpmDependencies(req) {
  const commandLsResult = await executeCommand(
    req.params.projectPath, 'npm ls --depth=0 --json -dev');
  const { dependencies } = UtilsService.parseJSON(commandLsResult.stdout);

  const commandOutdtedResult = await executeCommand(
    req.params.projectPath, 'npm outdated --json -dev');
  const versions = UtilsService.parseJSON(commandOutdtedResult.stdout);

  const packageJson =
    JSON.parse(fs.readFileSync(`${req.params.projectPath}/package.json`, 'utf-8'));

  return Object.keys(dependencies)
    .map(name => mapNpmDependency(
      name,
      dependencies[name],
      versions[name],
      packageJson.devDependencies[name],
    ));
}

async function getRegularBowerDependencies(req) {
  const commandLsResult = await executeCommand(req.params.projectPath, 'bower list --json');
  const { dependencies, pkgMeta } = UtilsService.parseJSON(commandLsResult.stdout);

  return Object.keys(dependencies)
    .filter(name => Object.keys(pkgMeta.dependencies).includes(name))
    .map(name => mapBowerDependency(name, dependencies[name]));
}

async function getDevBowerDependencies(req) {
  const commandLsResult = await executeCommand(req.params.projectPath, 'bower list --json');
  const { dependencies, pkgMeta } = UtilsService.parseJSON(commandLsResult.stdout);

  return Object.keys(dependencies)
    .filter(name => Object.keys(pkgMeta.devDependencies).includes(name))
    .map(name => mapBowerDependency(name, dependencies[name]));
}

export async function getRegularDependencies(req, res) {
  const npmCacheName = `${req.params.projectPath}-npmRegular`;
  const bowerCacheName = `${req.params.projectPath}-bowerRegular`;

  const npmDependencies = getFromCache(npmCacheName) || await getRegularNpmDependencies(req);
  const bowerDependencies = getFromCache(bowerCacheName) || await getRegularBowerDependencies(req);

  putToCache(npmCacheName, npmDependencies);
  putToCache(bowerCacheName, bowerDependencies);

  res.json([...npmDependencies, ...bowerDependencies]);
}

export async function getDevDependencies(req, res) {
  const npmCacheName = `${req.params.projectPath}-npmDev`;
  const bowerCacheName = `${req.params.projectPath}-bowerDev`;

  const npmDevDependencies = getFromCache(npmCacheName) || await getDevNpmDependencies(req);
  const bowerDevDependencies = getFromCache(bowerCacheName) || await getDevBowerDependencies(req);

  putToCache(npmCacheName, npmDevDependencies);
  putToCache(bowerCacheName, bowerDevDependencies);

  res.json([...npmDevDependencies, ...bowerDevDependencies]);
}
