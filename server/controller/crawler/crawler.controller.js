import path from 'path';
import Promise from 'bluebird';

const fs = Promise.promisifyAll(require('fs'));

function whenGet(req, res) {
    // this should be moved to service
  const normalizedPath = path.normalize(`/${req.params.path}`);
  fs
    .readdirAsync(normalizedPath)
    .then((data) => {
      const dataToReturn = [];
      for (let i = 0; i < data.length; i++) {
        const fileStat = fs.lstatSync(`${normalizedPath}/${data[i]}`);
        dataToReturn.push({
          directory: fileStat.isDirectory(),
          name: data[i],
        });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).send({
        path: normalizedPath,
        files: dataToReturn,
      });
    })
    .catch((err) => {
      console.error(err);
      res.setHeader('Content-Type', 'application/json');
      res.status(404).send({});
    });
}

export default {
  whenGet,
};
