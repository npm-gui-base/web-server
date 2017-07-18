import NpmGuiCore from '../../core';

const SearchService = NpmGuiCore.Service.Search;

async function whenPost(req, res) {
  const results = await SearchService.search(req.params.repo, req.body.query);

  res.setHeader('Content-Type', 'application/json');
  res.status(200).send(results);
}

export default {
  whenPost,
};
