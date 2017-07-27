import path from 'path';
import NpmGuiCore from '../../core';

const ProjectService = NpmGuiCore.Service.Project;

function whenGet(req, res) {
  const packageJsonParsed = ProjectService.getPackageJson().getParsed();
  packageJsonParsed.projectPath = ProjectService.getPath();

  res.json(packageJsonParsed);
}

function whenPut(req, res) {
  ProjectService.setProjectPath(path.normalize(`/${req.params.path}`));

  res.json({});
}

export default {
  whenGet,
  whenPut,
};
