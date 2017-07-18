// import Rx from 'rx';
import CommandsService from '../commands/commands.service.js';
// import ProjectService from '../project/project.service.js';
// import UtilsService from '../utils/utils.service.js';
import DependenciesVersionService from './dependencies.version.service';


// function insertDevDependency(repo, name) {
//   return Rx.Observable.create((observer) => {

//   });
// }

// function insertDependency(repo, name) {
//   return Rx.Observable.create((observer) => {
//     DependenciesVersionService
//       .getVersionFor(repo, name)
//       .subscribe((versions) => {
//         observer.onNext(version);
//         observer.onCompleted();
//       });
//   });
// }

export default {
  install(isDev, repo, name) {
    return CommandsService
      .run(CommandsService.cmd[repo].install, true, [name, isDev ? '-D' : '-S'])
      .flatMap(() => DependenciesVersionService.getVersionsFor(repo, name.split('@')[0]))
      .map(versions => console.log(versions));
      // TODO save version and package to dependencies cache
  },
};
