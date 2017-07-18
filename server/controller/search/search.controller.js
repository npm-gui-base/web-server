import NpmGuiCore from '../../core';

const SearchService = NpmGuiCore.Service.Search;

function whenPost(req, res) {
  SearchService
      .search(req.params.repo, req.body.query)
      .subscribe((results) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(results);
      });
}

export default {
  whenPost,
};
