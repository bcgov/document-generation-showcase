'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.log(yosay(`Welcome to the ${chalk.green('DGRSC')} tools generators.\ntry ${chalk.yellow('yo dgrsc:init-env')}`));
  }

  configuring() {
  }

};
