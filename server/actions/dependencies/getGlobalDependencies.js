import executeCommand from '../executeCommand';
import UtilsService from '../../service/utils/utils.service';

export async function getGlobalDependencies(req, res) {
  const commandResult = await executeCommand(null, 'npm ls -g --depth=0 --json');
  const { dependencies } = UtilsService.parseJSON(commandResult.stdout);

  const npmDependencies = Object.keys(dependencies).map(key => ({
    key,
    repo: 'npm',
    version: dependencies[key].version,
  }));

  res.json(npmDependencies);
}
