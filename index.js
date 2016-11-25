const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const opn = require('opn');
const NpmGuiCore = require('npm-gui-base-core');
const NpmGuiCoreControllers = require('npm-gui-base-core-controllers');

global.appRoot = path.resolve(__dirname + '/node_modules/web-client/dist/');
const app = express();


// Define a port/host we want to listen to
const PORT = 1337;
const HOST = '0.0.0.0';


// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

// use routes
app.use('/', NpmGuiCoreControllers.Routes.Static);
app.use('/api/dependencies', NpmGuiCoreControllers.Routes.Dependencies);
app.use('/api/dependencies-dev', NpmGuiCoreControllers.Routes.Dependencies);
app.use('/api/dependencies-bin', NpmGuiCoreControllers.Routes.DependenciesBin);
app.use('/api/global', NpmGuiCoreControllers.Routes.GlobalPackages);
app.use('/api/tasks', NpmGuiCoreControllers.Routes.Tasks);
app.use('/api/crawler', NpmGuiCoreControllers.Routes.Crawler);
app.use('/api/project', NpmGuiCoreControllers.Routes.Project);


function start(host, port) {
  // start server
  const server = app.listen(port || PORT, host || HOST, () => {
    console.log(`npm-gui web-server running at http://${(host || HOST)}:${(port || PORT)}/`);
    opn(`http://${(host || HOST)}:${(port || PORT)}`);
  });

  NpmGuiCore.Service.Console.bind(server);

  return server;
}

module.exports = start;
