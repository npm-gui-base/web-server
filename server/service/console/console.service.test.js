require('should'); // eslint-disable-line
const proxyquire = require('proxyquire'); // eslint-disable-line
const sinon = require('sinon'); // eslint-disable-line
require('should-sinon'); // eslint-disable-line

const serverInstance = 'any server instance';

const wsConnection = {
  send: sinon.spy(),
};

const WSInstance = {
  on: sinon.stub().callsArgWith(1, wsConnection),
};

const WSServerMock = {
  Server: sinon.stub().returns(WSInstance),
};

const ConsoleService = proxyquire('./console.service', {
  ws: WSServerMock,
});

describe('Console Service', () => {
  it('should bind to WebSocket connection and message', () => {
    ConsoleService.bind(serverInstance);
    WSServerMock.Server.should.be.calledWith({
      server: serverInstance,
    });

    WSInstance.on.should.be.calledWith('connection');
    WSInstance.on.should.be.calledWith('message');
  });

  it('should send message;', () => {
    ConsoleService.bind(serverInstance);

    ConsoleService.send('message');
    wsConnection.send.should.be.calledWith('message');
  });
});
