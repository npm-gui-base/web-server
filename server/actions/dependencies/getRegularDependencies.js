import executeCommand from '../executeCommand';
import UtilsService from '../../service/utils/utils.service';

export async function getRegularDependencies(req, res) {
  const commandLsResult = await executeCommand(req.params.projectPath, 'npm ls --depth=0 --json');
  const { dependencies } = UtilsService.parseJSON(commandLsResult.stdout);

  const commandOutdtedResult = await executeCommand(req.params.projectPath, 'npm outdated --json');
  const versions = UtilsService.parseJSON(commandOutdtedResult.stdout);
  console.log(versions);

  const npmDependencies = Object.keys(dependencies).map(name => ({
    name,
    repo: 'npm',
    required: dependencies[name].required,
    installed: versions[name].installed || null,
    wanted: versions[name].wanted,
    latest: versions[name].latest,
  }));

  res.json(npmDependencies);
}
