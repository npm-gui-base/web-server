const NpmGuiCore = require('../../core');

const UtilsService = NpmGuiCore.Service.Utils;
const CommandsService = NpmGuiCore.Service.Commands;

// this also need service or be in modules service
module.exports = {
  whenPut(req, res) {
    const putCommand = JSON.parse(JSON.stringify(CommandsService.cmd.npm.install));
    putCommand.args.push(req.body.key + (req.body.value ? `@${req.body.value}` : ''));
    putCommand.args.push('-g');

    CommandsService
      .run(putCommand, true)
      .then(() => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send();
      });
  },

  whenDelete(req, res) {
    CommandsService
      .run(CommandsService.cmd.npm.uninstall, true, [req.params.name, '-g'])
      .then(() => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send();
      });
  },

  whenGet(req, res) {
    CommandsService
      .run(CommandsService.cmd.npm.ls, false, ['-g'])
      .then((data) => {
        const dependencies = UtilsService.parseJSON(data.stdout).dependencies;
        const preparedDependenciesArray = [];
        UtilsService.buildArrayFromObject(dependencies, preparedDependenciesArray, 'key', 'value');
        for (let i = 0; i < preparedDependenciesArray.length; i++) {
          preparedDependenciesArray[i].value = preparedDependenciesArray[i].value.version;
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(preparedDependenciesArray);
      });
  },

  whenGetVersions(req, res) {
    let dependencies = null;

    CommandsService
      .run(CommandsService.cmd.npm.ls, false, ['-g'])
      .then((data) => {
        dependencies = UtilsService.parseJSON(data.stdout).dependencies;
        return CommandsService.run(CommandsService.cmd.npm.ls, false, ['-g']);
      })
      .then((data) => {
        const outdated = UtilsService.parseJSON(data.stdout);
        for (const [key, dependency] of outdated) {
          if (dependency.wanted !== dependency.current) {
            dependencies[key].wanted = dependency.wanted;
          }
          dependencies[key].latest = dependency.latest;
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(dependencies);
      });
  },

  whenGetNSP(req, res) {
    // TODO?
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send({});
  },
};
