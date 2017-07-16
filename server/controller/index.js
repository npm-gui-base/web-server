const Crawler = require('./crawler/crawler.routes');
const Dependencies = require('./dependencies/dependencies.routes');
const GlobalPackages = require('./globalPackages/globalPackages.routes');
const DependenciesBin = require('./dependenciesBin/dependenciesBin.routes');
const Project = require('./project/project.routes');
const Static = require('./static/static.routes');
const Tasks = require('./tasks/tasks.routes');
const Search = require('./search/search.routes');

module.exports = {
  Crawler,
  Dependencies,
  GlobalPackages,
  DependenciesBin,
  Project,
  Static,
  Tasks,
  Search,
};
