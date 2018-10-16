import spawn from 'cross-spawn';

export default function executeCommand(cwd, wholeCommand) {
  return new Promise((resolve, reject) => {
    // spawn process
    const args = wholeCommand.split(' ');
    const command = args.shift();
    const spawned = spawn(command, args, { cwd });

    // wait for stdout, stderr
    let stdout = '';
    spawned.stdout.on('data', (data) => {
      stdout += data.toString();
      // send part data through socket if required
    });

    let stderr = '';
    spawned.stderr.on('data', (data) => {
      stderr += data;
      // TODO send as stderr and show red color
    });

    // wait for finish and resolve
    spawned.on('close', () => {
      resolve({
        stdout,
        stderr,
      });
    });

    // if error
    spawned.on('error', () => {
      reject({
        stdout,
        stderr,
      });
    });
  });
}
