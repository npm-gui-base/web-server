import executeCommand from '../executeCommand';
import UtilsService from '../../service/utils/utils.service';

export async function getRegularDependencies(req, res) {
  console.log(req.params);
  const commandResult = await executeCommand(req.params.projectPath, 'npm ls --depth=0 --json');
  const { dependencies } = UtilsService.parseJSON(commandResult.stdout);

  const npmDependencies = Object.keys(dependencies).map(key => ({
    key,
    repo: 'npm',
    version: dependencies[key].version,
  }));

  res.json(npmDependencies);
}
