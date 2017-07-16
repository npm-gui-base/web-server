import Rx from 'rx';
import ProjectService from '../project/project.service.js';
// import DependenciesVersionService from './dependencies.version.service';

// function updateDependenciesInfo(repo, isDev) {
//   return Rx.Observable.create((observer) => {
//     const packageJson = ProjectService.getPackageJson(repo);

//     const dependencies = isDev ?
//       packageJson.getDevDependenciesArrayAs(repo)
//       :
//       packageJson.getDependenciesArrayAs(repo);

//     // check versions
//     DependenciesVersionService
//       .checkVersionFor(repo, dependencies)
//       .subscribe(() => {
//         observer.onNext(dependencies);
//         observer.onCompleted();
//       });
//   });
// }

// function updateRepo(repo) {
//   return Rx.Observable.create((observer) => {
//     if (!ProjectService.isRepoAvailable(repo)) {
//       observer.onNext();
//       observer.onCompleted();
//       return;
//     }

//     const sourceRegular = updateDependenciesInfo(repo, false).share();
//     const sourceDev = updateDependenciesInfo(repo, true).share();


//     const source = sourceRegular.merge(sourceDev);

//     sourceRegular
//       .subscribe((data) => {
//         ProjectService.dependencies.all = ProjectService.dependencies.all.concat(data);
//       });

//     sourceDev
//       .subscribe((data) => {
//         ProjectService.devDependencies.all = ProjectService.devDependencies.all.concat(data);
//       });

//     source
//       .subscribeOnCompleted(() => {
//         observer.onNext();
//         observer.onCompleted();
//       });
//   });
// }

// function updateModulesInfo() {
//   return Rx.Observable.create((observer) => {
//     ProjectService.checkReposAvailability()
//       .subscribe(() => {
//         // repos availability completed
//         // clear arrays
//         ProjectService.dependencies.all = [];
//         ProjectService.devDependencies.all = [];
//         // update all repos
//         const sourceNPM = updateRepo('npm');
//         const sourceBower = updateRepo('bower');

//         const sourceBoth = sourceNPM.merge(sourceBower);

//         sourceBoth
//           .subscribeOnCompleted(() => {
//             ProjectService.dependencies.lastId = true;
//             ProjectService.devDependencies.lastId = true;
//             observer.onNext();
//             observer.onCompleted();
//           });
//       });
//   });
// }

function updateDependenciesCache() {
  ProjectService
    .getAvailableRepos()
    .flatMap(availableRepos => availableRepos);
}

// ///////////////////////////////////////////////////////////////////////////////

module.exports = {
  get(isDev) {
    if (ProjectService.dependencies.lastId && ProjectService.devDependencies.lastId) {
      // just return values
      return Rx.Observable.just(isDev ?
        ProjectService.devDependencies.all : ProjectService.dependencies.all);
    }
      // start update and return values
    return updateDependenciesCache()
        .map(() => (isDev ? ProjectService.devDependencies.all : ProjectService.dependencies.all));
  },
};
