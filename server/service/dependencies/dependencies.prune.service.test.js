require('should');
const proxyquire = require('proxyquire');
const sinon = require('sinon');
require('should-sinon');
const Rx = require('rx');

let isRepoAvailableObservable = new Rx.Subject();
let commandRunObservable = new Rx.Subject();

const CommandsServiceMock = {
  run: sinon.stub().returns(commandRunObservable),
  cmd: {
    npm: {
      prune: 'npm prune command',
    },
    bower: {
      prune: 'bower prune command',
    },
  },
};

const ProjectServiceMock = {
  isRepoAvailable: sinon.stub().returns(isRepoAvailableObservable),
};

const DependenciesPruneService = proxyquire('./dependencies.prune.service', {
  '../../service/commands/commands.service.js': CommandsServiceMock,
  '../../service/project/project.service.js': ProjectServiceMock,
});

describe('Dependencies Service - Prune module', () => {
  beforeEach(() => {
    ProjectServiceMock.isRepoAvailable.reset();
    CommandsServiceMock.run.reset();
  });

  it('should call npm, bower command with bind to console', (done) => {
    DependenciesPruneService
      .prune()
      .subscribe(() => {
        ProjectServiceMock.isRepoAvailable.should.be.calledWith('npm');
        ProjectServiceMock.isRepoAvailable.should.be.calledWith('bower');

        CommandsServiceMock.run.should
          .be.calledWith(CommandsServiceMock.cmd.npm.prune, true);
        CommandsServiceMock.run.should
          .be.calledWith(CommandsServiceMock.cmd.bower.prune, true);

        done();
      });

    isRepoAvailableObservable.onNext();
    commandRunObservable.onNext();

    isRepoAvailableObservable.onNext();
    commandRunObservable.onNext();
  });

  it('should call npm, bower command but when error one of them another should process anyway', (done) => {
    DependenciesPruneService
      .prune()
      .subscribe(() => {
        ProjectServiceMock.isRepoAvailable.should.be.calledWith('npm');
        ProjectServiceMock.isRepoAvailable.should.be.calledWith('bower');

        CommandsServiceMock.run.should.not
          .be.calledWith(CommandsServiceMock.cmd.npm.prune, true);
        CommandsServiceMock.run.should
          .be.calledWith(CommandsServiceMock.cmd.bower.prune, true);

        done();
      });

    isRepoAvailableObservable.onError(new Error(false));
    commandRunObservable.onNext();

    isRepoAvailableObservable.onNext();
    commandRunObservable.onNext();
  });

  xit('should return extraneous packages count', () => {

  });
});
