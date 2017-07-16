const NpmGuiCore = require('../../core');

const SearchService = NpmGuiCore.Service.Search;


module.exports = {
  whenPost(req, res) {
    SearchService
      .search(req.params.repo, req.body.query)
      .subscribe((results) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(results);
      });
  },
};
