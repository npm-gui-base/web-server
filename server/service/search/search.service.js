import Rx from 'rx';
import request from 'request';

function searchBower(query) {
  return Rx.Observable.just(`https://libraries.io/api/bower-search?q=${query}`)
    .flatMap((url) => Rx.Observable.create((observer) => {
      request(url, (error, response, body) => {
        observer.onNext(body);
        observer.onCompleted();
      });
    }))
    .map(response => JSON.parse(response))
    .map(results => {
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
  return Rx.Observable.just(`https://api.npms.io/v2/search?from=0&size=25&q=${query}`)
    .flatMap((url) => Rx.Observable.create((observer) => {
      request(url, (error, response, body) => {
        observer.onNext(body);
        observer.onCompleted();
      });
    }))
    .map(response => JSON.parse(response))
    .map(responseJson => responseJson.results)
    .map(results => {
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
