const NpmGuiCore = require('../../core');

const UtilsService = NpmGuiCore.Service.Utils;
const CommandsService = NpmGuiCore.Service.Commands;
// const ProjectService = NpmGuiCore.Service.Project;
const DependenciesService = NpmGuiCore.Service.Dependencies;

module.exports = {
  whenPut(req, res) {
    DependenciesService
      .install(
        UtilsService.isDevDependencies(req),
        req.params.repo,
        req.body.key + (req.body.value ? `@${req.body.value}` : '')
      )
      .subscribe(() => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send({});
      }, (err) => {
        console.log(err);
        res.setHeader('Content-Type', 'application/json');
        res.status(500).send(err);
      });
  },

  whenDelete(req, res) {
    DependenciesService
      .uninstall(UtilsService.isDevDependencies(req), req.params.repo, req.params.name)
      .subscribe(() => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send();
      }, () => {
        res.setHeader('Content-Type', 'application/json');
        res.status(500).send(/* TODO ERROR*/);
      });
  },

  whenGet(req, res) {
    DependenciesService
      .get(UtilsService.isDevDependencies(req))
      .subscribe((dependencies) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(dependencies);
      }, () => {
        res.setHeader('Content-Type', 'application/json');
        res.status(500).send(/* TODO ERROR*/);
      });
  },

  whenGetReinstallAll(req, res) {
    DependenciesService
      .reinstallAllDependencies()
      .subscribe(() => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send();
      }, () => {
        res.setHeader('Content-Type', 'application/json');
        res.status(500).send(/* TODO ERROR*/);
      });
  },

  whenPostUpdateAll(req, res) {
    DependenciesService
      .updateAllDependencies(UtilsService.isDevDependencies(req), req.body.type)
      .subscribe((dependencies) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(dependencies);
      }, () => {
        res.setHeader('Content-Type', 'application/json');
        res.status(500).send(/* TODO ERROR*/);
      });
  },

  whenGetNSP(req, res) {
    // this also should call ModulesService for help
    CommandsService
      .run(CommandsService.cmd.nsp.check)
      .subscribe(() => {
        // TODO
        /* const dependencies = {};
         if (data.stderr) {
         UtilsService.buildObjectFromArray(
         UtilsService.parseJSON(data.stderr), dependencies, 'module');
         }*/
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send({});
      });
  },

  whenGetPrune(req, res) {
    DependenciesService
      .prune()
      .subscribe(() => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send({});
      }, () => {
        res.setHeader('Content-Type', 'application/json');
        res.status(500).send(/* TODO ERROR*/);
      });
  },

  whenGetDedupe(req, res) {
    DependenciesService
      .dedupe()
      .subscribe(() => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send({});
      }, () => {
        res.setHeader('Content-Type', 'application/json');
        res.status(500).send(/* TODO ERROR*/);
      });
  },
};
