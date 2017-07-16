const Rx = require('rx');
const CommandsService = require('../../service/commands/commands.service.js');
const ProjectService = require('../../service/project/project.service.js');

// function pruneModules(repo) {
//   return ProjectService.isRepoAvailable(repo)
//     .flatMap(() => CommandsService.run(CommandsService.cmd[repo].prune, true));
// }

module.exports.prune = function prune() {
  return ProjectService.isRepoAvailable('npm')
    .flatMap(() => CommandsService.run(CommandsService.cmd.npm.prune, true))
    .catch((err) => {
      console.log(err);
      return Rx.Observable.just();
    })
    .flatMap(() => ProjectService.isRepoAvailable('bower'))
    .flatMap(() => CommandsService.run(CommandsService.cmd.bower.prune, true))
    .catch((err) => {
      console.log(err);
      return Rx.Observable.just();
    });

// return pruneModules('npm').catch((err) =>
// {console.log(err);return Rx.Observable.just();}).flatMap(() => pruneModules('bower'));
};
// .catch(() => Rx.Observable.just())

module.exports.pruneCount = function prune() {
  return Rx.Observable.create(() => {
    // TODO
  });
};
