const CommandsService = require('../commands/commands.service.js');
const UtilsService = require('../utils/utils.service.js');

const methodsFor = {
  bower: {
    mapDependenciesListed(dependenciesListed) {
      const dependenciesListedSimplified = {};

      if (dependenciesListed) {
        Object.keys(dependenciesListed)
          .forEach((key) => {
            const dependency = dependenciesListed[key];

            if (dependency.pkgMeta) {
              dependenciesListedSimplified[key] = {
                key,
                version: dependency.pkgMeta.version,
              };
              if (dependency.update.target !== dependency.pkgMeta.version) {
                dependenciesListedSimplified[key].wanted = dependency.update.target;
              }
              if (dependency.update.latest !== dependency.pkgMeta.version) {
                dependenciesListedSimplified[key].latest = dependency.update.latest;
              }
            }
          });
      }

      return dependenciesListedSimplified;
    },
    getVersions() {
      return CommandsService
        .run(CommandsService.cmd.bower.ls) // we cant give a name
        .map(data => UtilsService.parseJSON(data.stdout).dependencies)
        .map(this.mapDependenciesListed);
    },
  },
  npm: {
    mapDependenciesListed(dependenciesListed) {
      const dependenciesListedSimplified = {};

      Object.keys(dependenciesListed)
        .forEach((key) => {
          const dependency = dependenciesListed[key];

          dependenciesListedSimplified[key] = {
            key,
            version: dependency.version,
          };
        });

      return dependenciesListedSimplified;
    },
    getListed(name) {
      return CommandsService
        .run(CommandsService.cmd.npm.ls, false, [name])
        .map(data => UtilsService.parseJSON(data.stdout).dependencies)
        .map(this.mapDependenciesListed);
    },
    getOutdated(dependenciesListedSimplified, name) {
      const dependenciesListedOutdatedSimplified
        = UtilsService.deepCopy(dependenciesListedSimplified);

      return CommandsService
        .run(CommandsService.cmd.npm.outdated, false, [name])
        .map(data => UtilsService.parseJSON(data.stdout))
        .map((dependenciesOutdated) => {
          if (dependenciesOutdated) {
            Object.keys(dependenciesOutdated)
              .forEach((key) => {
                const dependency = dependenciesOutdated[key];
                if (dependency.wanted !== dependency.current) {
                  dependenciesListedOutdatedSimplified[key].wanted = dependency.wanted;
                }
                if (dependency.wanted !== dependency.current) {
                  dependenciesListedOutdatedSimplified[key].latest = dependency.latest;
                }
              });
          }

          return dependenciesListedOutdatedSimplified;
        });
    },
    getVersions(name) {
      return this.getListed(name)
        .flatMap(dependenciesListedSimplified =>
          this.getOutdated(dependenciesListedSimplified, name));
    },
  },
};

module.exports = {
  getVersionsFor(repo, name) {
    return methodsFor[repo].getVersions(name);
  },
};
