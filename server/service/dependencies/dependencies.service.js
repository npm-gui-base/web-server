import CommandsService from '../../service/commands/commands.service.js';
import UtilsService from '../../service/utils/utils.service.js';
import ProjectService from '../../service/project/project.service.js';

async function checkVersionBower(dependencies) {
  const lsCommandResult = await CommandsService.run(CommandsService.cmd.bower.ls);
  const dependenciesListed = UtilsService.parseJSON(lsCommandResult.stdout).dependencies;

  Object.keys(dependenciesListed).forEach((key) => {
    const dependency = dependenciesListed[key];
    if (dependency.pkgMeta) {
      UtilsService.setInArrayByRepoAndKey('bower',
        'key', key,
        'version', dependency.pkgMeta.version,
        dependencies);

      if (dependency.update.target !== dependency.pkgMeta.version) {
        UtilsService.setInArrayByRepoAndKey('bower',
          'key', key,
          'wanted', dependency.update.target,
          dependencies);
      }
      if (dependency.update.latest !== dependency.pkgMeta.version) {
        UtilsService.setInArrayByRepoAndKey('bower',
          'key', key,
          'latest', dependency.update.latest,
          dependencies);
      }
    }
  });

  return dependencies;
}

async function checkVersionNPM(dependencies) {
  const lsCommandResult = await CommandsService.run(CommandsService.cmd.npm.ls);
  const dependenciesListed = UtilsService.parseJSON(lsCommandResult.stdout).dependencies;

  Object.keys(dependenciesListed).forEach((key) => {
    const dependency = dependenciesListed[key];
    UtilsService.setInArrayByRepoAndKey('npm',
      'key', key,
      'version', dependency.version,
      dependencies);
  });

  const outdatedCommandResult = await CommandsService.run(CommandsService.cmd.npm.outdated);
  const dependenciesOutdated = UtilsService.parseJSON(outdatedCommandResult.stdout);

  Object.keys(dependenciesOutdated).forEach((key) => {
    const dependency = dependenciesOutdated[key];
    if (dependency.wanted !== dependency.current) {
      UtilsService.setInArrayByRepoAndKey('npm',
      'key', key,
      'wanted', dependency.wanted,
      dependencies);
    }
    if (dependency.latest !== dependency.current) {
      UtilsService.setInArrayByRepoAndKey('npm',
        'key', key,
        'latest', dependency.latest,
        dependencies);
    }
  });

  return dependencies;
}

async function updateDependenciesInfo(repo, isDev) {
  const packageJson = ProjectService.getPackageJson(repo);

  const dependencies = isDev ?
      packageJson.getDevDependenciesArrayAs(repo)
      :
      packageJson.getDependenciesArrayAs(repo);

  // check versions

  try {
    if (repo === 'bower') {
      await checkVersionBower(dependencies);
    } else {
      await checkVersionNPM(dependencies);
    }
  } catch (e) {
    console.error('Command error', e);
  }
  return dependencies;
}

async function updateRepo(repo) {
  if (!ProjectService.isRepoAvailable(repo)) {
    return;
  }

  const dependencies = await updateDependenciesInfo(repo, false);
  ProjectService.dependencies.all = ProjectService.dependencies.all.concat(dependencies);

  const devDependencies = await updateDependenciesInfo(repo, true);
  ProjectService.devDependencies.all = ProjectService.devDependencies.all.concat(devDependencies);
}

async function updateModulesInfo() {
  await ProjectService.checkReposAvailability();
  // repos availability completed
  // clear arrays
  ProjectService.dependencies.all = [];
  ProjectService.devDependencies.all = [];
  // update all repos
  await updateRepo('npm');
  await updateRepo('bower');

  ProjectService.dependencies.lastId = true;
  ProjectService.devDependencies.lastId = true;
}

// ///////////////////////////////////////////////////////////////////////////////

export default {
  get(isDev) {
    return new Promise((resolve) => {
      if (ProjectService.dependencies.lastId && ProjectService.devDependencies.lastId) {
        resolve(isDev ? ProjectService.devDependencies.all : ProjectService.dependencies.all);
      } else {
        updateModulesInfo()
          .then(() => {
            resolve(isDev ? ProjectService.devDependencies.all : ProjectService.dependencies.all);
          });
      }
    });
  },
};
