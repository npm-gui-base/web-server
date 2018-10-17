const cache = {};

export function getFromCache(name) {
  return cache[name];
}

export function putToCache(name, data) {
  cache[name] = data;
}

export function pushToCache(name, data) {
  if (cache[name]) {
    cache[name].push(data);
  }
}

export function spliceFromCache(name, compareFunction) {
  if (cache[name]) {
    const indexToSplice = cache[name].findIndex(compareFunction);
    cache[name].splice(indexToSplice, 1);
  }
}

