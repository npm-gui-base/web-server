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
        res.json({});
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

        res.json({});
      });
  },

  async whenGet(req, res) {
    const dependencies = await Service.Dependencies.get(Service.Utils.isDevDependencies(req));
    res.json(dependencies);
  },

  whenGetReinstallAll(req, res) {
    Service.Dependencies
      .reinstallAllDependencies()
      .subscribe(() => {
        res.json({});
      });
  },

  whenPostUpdateAll(req, res) {
    const type = req.body.type;
    const isDev = Service.Utils.isDevDependencies(req);

    Service.Dependencies
      .updateAllDependencies(isDev, type)
      .subscribe((dependencies) => {
        res.json(dependencies);
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
        res.json({});
      });
  },

  whenGetPrune(req, res) {
    Service.Dependencies
      .prune()
      .subscribe(() => {
        res.json({});
      });
  },

  whenGetDedupe(req, res) {
    Service.Dependencies
      .dedupe()
      .subscribe(() => {
        res.json({});
      });
  },
};
