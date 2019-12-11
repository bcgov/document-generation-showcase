'use strict';
const Generator = require('../oc-generator');
const chalk = require('chalk');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.option('destination', {type: String, required: true, desc: 'Destination namespace'});
    this.option('type', {type: String, required: false, desc: 'Object Type'});
    this.option('name', {type: String, required: false, desc: 'Object Name'});
  }

  async prompting() {

    this.answers = {};

    const prompts = [
      {
        type: 'input',
        name: 'destination',
        message: 'Enter the target namespace',
        default: this.answers.destination || this.options.destination
      },
      {
        type: 'input',
        name: 'objectType',
        message: 'Enter the type of object to delete',
        default: this.options.type
      },
      {
        type: 'input',
        name: 'objectName',
        message: 'Enter the name of the object to delete',
        default: this.options.name
      }
    ];

    return this.prompt(prompts).then(answers => {
      this.answers = answers;
    });
  }

  writing() {
    if (this.isNamespaceAdmin(this.answers.destination)) {
      if (this.findObject(this.answers.destination, this.answers.objectType, this.answers.objectName)) {
        this.deleteObject(this.answers.destination, this.answers.objectType, this.answers.objectName);
      } else {
        this.log(`Could not find ${chalk.red(this.answers.objectType)}/${chalk.red(this.answers.objectName)} in ${this.answers.destination}.`);
      }
    }
  }
};
