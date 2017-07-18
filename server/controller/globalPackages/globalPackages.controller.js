import NpmGuiCore from '../../core';

const Service = NpmGuiCore.Service;
const UtilsService = Service.Utils;
const CommandsService = Service.Commands;

// this also need service or be in modules service
async function whenPut(req, res) {
  const putCommand = JSON.parse(JSON.stringify(CommandsService.cmd.npm.install));
  putCommand.args.push(req.body.key + (req.body.value ? `@${req.body.value}` : ''));
  putCommand.args.push('-g');

  await CommandsService.run(putCommand, true);

  res.setHeader('Content-Type', 'application/json');
  res.status(200).send();
}

async function whenDelete(req, res) {
  await CommandsService.run(CommandsService.cmd.npm.uninstall, true, [req.params.name, '-g']);

  res.setHeader('Content-Type', 'application/json');
  res.status(200).send();
}

async function whenGet(req, res) {
  const commandResult = await CommandsService.run(CommandsService.cmd.npm.ls, false, ['-g']);

  const dependencies = UtilsService.parseJSON(commandResult.stdout).dependencies;
  const preparedDependenciesArray = [];
  UtilsService.buildArrayFromObject(dependencies, preparedDependenciesArray, 'key', 'value');
  for (let i = 0; i < preparedDependenciesArray.length; i++) {
    preparedDependenciesArray[i].value = preparedDependenciesArray[i].value.version;
  }

  res.setHeader('Content-Type', 'application/json');
  res.status(200).send(preparedDependenciesArray);
}

async function whenGetVersions(req, res) {
  let dependencies = null;

  // TODO?

  CommandsService
      .run(CommandsService.cmd.npm.ls, false, ['-g'])
      .then((commandResult) => {
        dependencies = UtilsService.parseJSON(commandResult.stdout).dependencies;
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
}

async function whenGetNSP(req, res) {
    // TODO?
  res.setHeader('Content-Type', 'application/json');
  res.status(200).send({});
}

export default {
  whenPut,
  whenDelete,
  whenGet,
  whenGetNSP,
  whenGetVersions,
};
