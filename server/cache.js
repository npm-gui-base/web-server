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
