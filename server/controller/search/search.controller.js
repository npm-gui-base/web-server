import NpmGuiCore from '../../core';

const SearchService = NpmGuiCore.Service.Search;

async function whenPost(req, res) {
  const results = await SearchService.search(req.params.repo, req.body.query);

  res.json(results);
}

export default {
  whenPost,
};
