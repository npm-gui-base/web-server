import request from 'request';

function requestWithPromise(url) {
  return new Promise((resolve) => {
    request(url, (error, response, body) => {
      resolve(body);
    });
  });
}

function searchBower(query) {
  return requestWithPromise(`https://libraries.io/api/bower-search?q=${query}`)
    .then(response => JSON.parse(response))
    .then(results => {
      const resultsFiltered = [];

      results.forEach((result) => {
        resultsFiltered.push({
          name: result.name,
          version: result.latest_release_number,
          score: result.stars,
          url: result.repository_url,
          description: result.description,
        });
      });

      return resultsFiltered;
    });
}

function searchNPM(query) {
  return requestWithPromise(`https://api.npms.io/v2/search?from=0&size=25&q=${query}`)
    .then(response => JSON.parse(response))
    .then(responseJson => responseJson.results)
    .then(results => {
      const resultsFiltered = [];

      results.forEach((result) => {
        resultsFiltered.push({
          name: result.package.name,
          version: result.package.version,
          score: result.score.final,
          url: result.package.links.repository,
          description: result.package.description,
        });
      });

      return resultsFiltered;
    });
}

const methodsFor = {
  bower: searchBower,
  npm: searchNPM,
};

export default {
  search(repo, query) {
    return methodsFor[repo](query);
  },
};
