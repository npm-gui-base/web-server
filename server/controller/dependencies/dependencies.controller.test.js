const chai = require('chai'); // eslint-disable-line
const expect = chai.expect;
const sinon = require('sinon'); // eslint-disable-line
const rewire = require('rewire'); // eslint-disable-line
// promise stub
const sinonStubPromise = require('sinon-stub-promise'); // eslint-disable-line
sinonStubPromise(sinon);

// application:
const modulesController = rewire('./modules.controller');
const commands = rewire('../../helpers/commands');
const helpers = rewire('../../helpers/helpers');

// mocks
const packageResultsMock = require('../../test/packageJson.mock').resultsMock; // eslint-disable-line

let res;
let req;
let output;
//
let isDevModules = true;


// objects mock
const PackageJsonMock = function PackageJsonMock() {
  return {
    getDependenciesArray() {
      return packageResultsMock.dependencies;
    },
    getDevDependenciesArray() {
      return packageResultsMock.devDependencies;
    },
  };
};

const HelpersMock = {
  isDevModules() {
    return isDevModules;
  },
  buildObjectFromArray: helpers.buildObjectFromArray,
  JSONparse: helpers.JSONparse,
};

const CommandsMock = {
  run() {
  },
  runStubs: {},
  nsp: commands.nsp,
  npm: commands.npm,
};

describe('Modules Controller', () => {
  before(() => {
    modulesController.__set__({ // eslint-disable-line
      PackageJson: PackageJsonMock,
      helpers: HelpersMock,
      commands: CommandsMock,
    });

    sinon.stub(CommandsMock, 'run', (command, ...arg) =>
      CommandsMock.runStubs[JSON.stringify(command)](arg));

    res = {
      setHeader() {
      },
      status() {
        return this;
      },
      send(out) {
        output = out;
      },
    };

    req = {
      originalUrl: '',
      body: {
        key: 'npm-gui',
      },
      params: {
        name: 'npm-gui',
        repo: 'npm',
      },
    };

    output = '';
  });

  describe('GET', () => {
    it('should return array of dependencies', () => {
      // preparation
      isDevModules = false;

      // execute
      modulesController.whenGet(req, res);

      // test
      expect(output[0]).to.deep.equal(packageResultsMock.dependencies[0]);
      expect(output[1]).to.deep.equal(packageResultsMock.dependencies[1]);
    });

    it('should return array of dev dependencies', () => {
      // preparation
      isDevModules = true;

      // execute
      modulesController.whenGet(req, res);

      // test
      expect(output[0]).to.deep.equal(packageResultsMock.devDependencies[0]);
      expect(output[1]).to.deep.equal(packageResultsMock.devDependencies[1]);
    });
  });

  describe('PUT', () => {
    it('should install regular dependency', () => {
      // preparation
      isDevModules = false;
      const installCommand = JSON.parse(JSON.stringify(commands.npm.install));
      installCommand.args.push('npm-gui');
      installCommand.args.push('-S');

      CommandsMock.runStubs[JSON.stringify(installCommand)] = sinon.stub().returnsPromise();
      CommandsMock.runStubs[JSON.stringify(installCommand)].resolves({});

      // execute
      modulesController.whenPut(req, res);

      // test
      expect(CommandsMock.run.calledWith(installCommand)).to.equal(true);
    });

    it('should install dev dependency', () => {
      // preparation
      isDevModules = true;
      const installCommand = JSON.parse(JSON.stringify(commands.npm.install));
      installCommand.args.push('npm-gui');
      installCommand.args.push('-D');

      CommandsMock.runStubs[JSON.stringify(installCommand)] = sinon.stub().returnsPromise();
      CommandsMock.runStubs[JSON.stringify(installCommand)].resolves({});

      // execute
      modulesController.whenPut(req, res);

      // test
      expect(CommandsMock.run.calledWith(installCommand)).to.equal(true);
    });
  });

  describe('DELETE', () => {
    it('should uninstall regular dependency', () => {
      // preparation
      isDevModules = false;
      const uninstallCommand = JSON.parse(JSON.stringify(commands.npm.uninstall));
      uninstallCommand.args.push('npm-gui');
      uninstallCommand.args.push('-S');

      CommandsMock.runStubs[JSON.stringify(uninstallCommand)] = sinon.stub().returnsPromise();
      CommandsMock.runStubs[JSON.stringify(uninstallCommand)].resolves({});

      // execute
      modulesController.whenDelete(req, res);

      // test
      expect(CommandsMock.run.calledWith(uninstallCommand)).to.equal(true);
    });

    it('should uninstall dev dependency', () => {
      // preparation
      isDevModules = true;
      const uninstallCommand = JSON.parse(JSON.stringify(commands.npm.uninstall));
      uninstallCommand.args.push('npm-gui');
      uninstallCommand.args.push('-D');

      CommandsMock.runStubs[JSON.stringify(uninstallCommand)] = sinon.stub().returnsPromise();
      CommandsMock.runStubs[JSON.stringify(uninstallCommand)].resolves({});

      // execute
      modulesController.whenDelete(req, res);

      // test
      expect(CommandsMock.run.calledWith(uninstallCommand)).to.equal(true);
    });
  });

  describe('NSP- GET', () => {
    it('should return insecure dependency from nsp command', () => {
      // preparation
      CommandsMock.runStubs[JSON.stringify(commands.nsp.check)] = sinon.stub().returnsPromise();
      CommandsMock.runStubs[JSON.stringify(commands.nsp.check)].resolves({
        stderr: '[{ "module": "angular" }, { "module": "tor" }]',
      });

      // execute
      modulesController.whenGetNSP(req, res);

      // test
      expect(CommandsMock.run.calledWith(commands.nsp.check)).to.equal(true);
      expect(output).to.deep.equal({
        angular: {
          module: 'angular',
        },
        tor: {
          module: 'tor',
        },
      });
    });
  });

  describe('Versions - GET', () => {
    it('should return full info about versions', () => {
      // preparation
      CommandsMock.runStubs[JSON.stringify(commands.npm.ls)] = sinon.stub().returnsPromise();
      CommandsMock.runStubs[JSON.stringify(commands.npm.ls)].resolves({
        stdout: '{' +
        '   "name": "npm-gui",' +
        '   "version": "x.x.x",' +
        '   "dependencies": {' +
        '       "angular": {' +
        '           "version": "2.4.0"' +
        '       }' +
        '   }' +
        '}',
      });
      CommandsMock.runStubs[JSON.stringify(commands.npm.outdated)] = sinon.stub().returnsPromise();
      CommandsMock.runStubs[JSON.stringify(commands.npm.outdated)].resolves({
        stdout: '{' +
        '   "angular": {' +
        '       "current": "2.4.0",' +
        '       "wanted": "2.4.5",' +
        '       "latest": "3.0.1",' +
        '       "location": "node_modules/angular"' +
        '   }' +
        '}',
      });

      // execute
      modulesController.whenGetVersions(req, res);

      // test
      expect(CommandsMock.run.calledWith(commands.npm.ls)).to.equal(true);
      expect(CommandsMock.run.calledWith(commands.npm.outdated)).to.equal(true);
      expect(output).to.deep.equal({
        angular: {
          version: '2.4.0',
          wanted: '2.4.5',
          latest: '3.0.1',
        },
      });
    });
  });
});
