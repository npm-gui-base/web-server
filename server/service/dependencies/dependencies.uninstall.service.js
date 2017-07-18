import Rx from 'rx';
import CommandsService from '../../service/commands/commands.service.js';
import ProjectService from '../../service/project/project.service.js';


function cutDependence(repo, name) {
  const packageJson = ProjectService.getPackageJson(repo);
  packageJson.removeDependence(name);
  ProjectService.dependencies.all
    .splice(this.dependencies.all.findIndex(dependency =>
      dependency.key === name && dependency.repo === repo), 1);
}

function cutDevDependence(repo, name) {
  const packageJson = ProjectService.getPackageJson(repo);
  packageJson.removeDevDependence(name);
  ProjectService.devDependencies.all
    .splice(this.dependencies.all.findIndex(dependency =>
      dependency.key === name && dependency.repo === repo), 1);
}

export default {
  uninstall(isDev, repo, name) {
    return Rx.Observable.create((observer) => {
      CommandsService
        .run(CommandsService.cmd[repo].remove, true, [name, isDev ? '-D' : '-S'])
        .subscribe(() => {
          if (isDev) {
            cutDevDependence(repo, name);
          } else {
            cutDependence(repo, name);
          }

          observer.onNext();
          observer.onCompleted();
        });
    });
  },
};
