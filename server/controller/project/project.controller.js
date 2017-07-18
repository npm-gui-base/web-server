import path from 'path';
import NpmGuiCore from '../../core';

const ProjectService = NpmGuiCore.Service.Project;

function whenGet(req, res) {
  const packageJsonParsed = ProjectService.getPackageJson().getParsed();
  packageJsonParsed.projectPath = ProjectService.getPath();

  res.setHeader('Content-Type', 'application/json');
  res.status(200).send(packageJsonParsed);
}

function whenPut(req, res) {
  ProjectService.setProjectPath(path.normalize(`/${req.params.path}`));

  res.setHeader('Content-Type', 'application/json');
  res.status(200).send({});
}

export default {
  whenGet,
  whenPut,
};
