require('should');
const proxyquire = require('proxyquire');
const sinon = require('sinon');
const Rx = require('rx');
require('should-sinon');

let isRepoAvailableObservable = new Rx.Subject();
let commandRunObservable = new Rx.Subject();

const CommandsServiceMock = {
  run: sinon.stub().returns(commandRunObservable),
  cmd: {
    npm: {
      dedupe: 'dedupe command',
    },
    bower: {
      dedupe: 'bower dedupe command (unavailable)',
    },
  },
};


const ProjectServiceMock = {
  isRepoAvailable: sinon.stub().returns(isRepoAvailableObservable),
};

const DependenciesDedupeService = proxyquire('./dependencies.dedupe.service', {
  '../../service/commands/commands.service.js': CommandsServiceMock,
  '../../service/project/project.service.js': ProjectServiceMock,
});

describe('Dependencies Service - Dedupe module', () => {
  it('should call npm command with bind to console', (done) => {
    DependenciesDedupeService
      .dedupe()
      .subscribe(() => {
        ProjectServiceMock.isRepoAvailable.should.be.calledWith('npm');
        ProjectServiceMock.isRepoAvailable.should.not.be.calledWith('bower');

        CommandsServiceMock.run.should
          .be.calledWith(CommandsServiceMock.cmd.npm.dedupe, true);
        CommandsServiceMock.run.should
          .not.be.calledWith(CommandsServiceMock.cmd.bower.dedupe, true);

        done();
      });

    isRepoAvailableObservable.onNext();
    commandRunObservable.onNext();
  });
});
