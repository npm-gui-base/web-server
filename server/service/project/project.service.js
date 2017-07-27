import fsAccess from 'fs-access';
import PackageJson from '../../model/package-json.js';

let projectPath = process.cwd();

const isRepoAvailable = {
  npm: false,
  bower: false,
};

export default {
  isRepoAvailable(repo) {
    return isRepoAvailable[repo];
  },

  getPath() {
    return projectPath;
  },

  setPath(newProjectPath) {
    projectPath = newProjectPath;
  },

  isRepoAvailableTest(repo) {
    const fileToTest = repo === 'bower' ? 'bower.json' : 'package.json';
    return new Promise((resolve, reject) => {
      fsAccess(`${this.getPath()}/${fileToTest}`, (err) => {
        if (!err) {
          resolve(true);
        } else {
          reject(false);
        }
      });
    });
  },

  getPackageJson(repo) {
    return new PackageJson(this.getPath(), (repo === 'npm' ? 'package' : repo));
  },

  checkReposAvailability() {
    return new Promise((resolve) => {
      const bowerTest = this.isRepoAvailableTest('bower')
        .then(() => {
          isRepoAvailable.bower = true;
        })
        .catch(() => {
          isRepoAvailable.bower = false;
        });

      const npmTest = this.isRepoAvailableTest('npm')
        .then(() => {
          isRepoAvailable.npm = true;
        })
        .catch(() => {
          isRepoAvailable.npm = false;
        });

      Promise.all([bowerTest, npmTest]).then(resolve);
    });
  },

  // or private? TODO test
  dependencies: {
    lastId: null,
    all: {},
  },

  devDependencies: {
    lastId: null,
    all: [],
  },
};
