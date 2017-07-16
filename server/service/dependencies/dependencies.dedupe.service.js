const CommandsService = require('../../service/commands/commands.service.js');
const ProjectService = require('../../service/project/project.service.js');

module.exports.dedupe = function dedupe() {
  return ProjectService.isRepoAvailable('npm')
    .flatMap(() => CommandsService.run(CommandsService.cmd.npm.dedupe, true));
};
