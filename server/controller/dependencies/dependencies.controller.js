import NpmGuiCore from '../../core';

const Service = NpmGuiCore.Service;

export default {
  whenPut(req, res) {
    const repo = req.params.repo;
    const args = [
      req.body.key + (req.body.value ? `@${req.body.value}` : ''),
      Service.Utils.isDevDependencies(req) ? '-D' : '-S',
    ];

    Service.Commands
      .run(Service.Commands.cmd[repo].install, true, args)
      .subscribe(() => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send();
      });
  },

  whenDelete(req, res) {
    const repo = req.params.repo;
    const args = [req.params.name, Service.Utils.isDevDependencies(req) ? '-D' : '-S'];

    // this should call method in modulesService
    Service.Commands
      .run(Service.Commands.cmd[repo].remove, true, args)
      .subscribe(() => {
        // bugfix
        // TODO tests
        const packageJson = Service.Project.getPackageJson(repo);
        if (Service.Utils.isDevDependencies(req)) {
          packageJson.removeDevDependence(req.params.name);
        } else {
          packageJson.removeDependence(req.params.name);
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).send();
      });
  },

  whenGet(req, res) {
    Service.Dependencies
      .get(Service.Utils.isDevDependencies(req))
      .subscribe((dependencies) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(dependencies);
      });
  },

  whenGetReinstallAll(req, res) {
    Service.Dependencies
      .reinstallAllDependencies()
      .subscribe(() => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send();
      });
  },

  whenPostUpdateAll(req, res) {
    const type = req.body.type;
    const isDev = Service.Utils.isDevDependencies(req);

    Service.Dependencies
      .updateAllDependencies(isDev, type)
      .subscribe((dependencies) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(dependencies);
      });
  },

  whenGetNSP(req, res) {
    // this also should call ModulesService for help
    Service.Commands
      .run(Service.Commands.cmd.nsp.check)
      .subscribe(() => {
        // TODO
        /* const dependencies = {};
        if (data.stderr) {
          Service.Utils.buildObjectFromArray(
            Service.Utils.parseJSON(data.stderr), dependencies, 'module');
        }*/
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send({});
      });
  },

  whenGetPrune(req, res) {
    Service.Dependencies
      .prune()
      .subscribe(() => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send({});
      });
  },

  whenGetDedupe(req, res) {
    Service.Dependencies
      .dedupe()
      .subscribe(() => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send({});
      });
  },
};
