import NpmGuiCore from '../../core';

const CommandsService = NpmGuiCore.Service.Commands;

const PackageJson = NpmGuiCore.Model.PackageJson;

function whenGet(req, res) {
  const packageJson = new PackageJson();
  res.setHeader('Content-Type', 'application/json');
  res.status(200).send(packageJson.getTasksArray());
}

function whenPut(req, res) {
  const packageJson = new PackageJson();
  packageJson.addTask(req.body.key, req.body.value);
  res.status(200).send();
}

function whenDelete(req, res) {
  const packageJson = new PackageJson();
  packageJson.removeTask(req.params.name);
  res.status(200).send();
}

function whenPost(req, res) {
  CommandsService
      .run(CommandsService.cmd.npm.run, true, [req.params.name])
      .then(() => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send();
      });
}

function whenGetHelp(req, res) {
  CommandsService
      .run(CommandsService.cmd.npm.bin)
      .then((data) =>
        CommandsService
          .run({
            command: 'node',
            args: [`${data.stdout.replace('\n', '')}/${req.params.name}`, '--help'],
          })
      )
      .then((data) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send({
          text: (data.stdout + data.stderr),
          flags: (data.stdout + data.stderr).match(/[-]{1,2}[a-zA-Z0-9]+/g),
        });
      });
}

export default {
  whenGet,
  whenPut,
  whenPost,
  whenGetHelp,
  whenDelete,
};
