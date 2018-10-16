import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
// import opn from 'opn';
import NpmGuiCore from './core';
import NpmGuiControllers from './controllers';

// Define a port/host we want to listen to
const PORT = 1337;
const HOST = '0.0.0.0';


const app = express();

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routes
// app.use('/', NpmGuiControllers.Routes.Static.onPath(`${path.resolve(__dirname)}/dist/web-client`));

app.use('/api/global', NpmGuiControllers.Routes.GlobalPackages);
// app.use('/api/crawler', NpmGuiControllers.Routes.Crawler);
// app.use('/api/search', NpmGuiControllers.Routes.Search);

const projectRouter = express.Router(); // eslint-disable-line

projectRouter.use('/:projectPath/dependencies', NpmGuiControllers.Routes.Dependencies);
projectRouter.use('/:projectPath/dependencies-dev', NpmGuiControllers.Routes.Dependencies);
projectRouter.use('/:projectPath/dependencies-bin', NpmGuiControllers.Routes.DependenciesBin);

app.use('/api/project', projectRouter);

// app.use('/api/dependencies', NpmGuiControllers.Routes.Dependencies);
// app.use('/api/dependencies-dev', NpmGuiControllers.Routes.Dependencies);
// app.use('/api/dependencies-bin', NpmGuiControllers.Routes.DependenciesBin);

// app.use('/api/:project/tasks', NpmGuiControllers.Routes.Tasks);
// app.use('/api/project', NpmGuiControllers.Routes.Project);

function start(host, port) {
  // start server
  const server = app.listen(port || PORT, host || HOST, () => {
    console.log(`npm-gui web-server running at http://${(host || HOST)}:${(port || PORT)}/`);
    // opn(`http://${(host || HOST)}:${(port || PORT)}`);
  });

  NpmGuiCore.Service.Console.bind(server, '/api/console');

  return server;
}

export default start;
