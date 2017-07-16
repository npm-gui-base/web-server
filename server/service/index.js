import Commands from './commands/commands.service';

const Console = require('./console/console.service');
const Dependencies = require('./dependencies');
const Project = require('./project/project.service');
const Utils = require('./utils/utils.service');
const Search = require('./search/search.service');

module.exports = {
  Commands,
  Console,
  Dependencies,
  Project,
  Utils,
  Search,
};
