'use strict';
const Generator = require('../oc-generator');
const chalk = require('chalk');

const MODULE_NAME = 'dgrsc-services-config';

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.option('destination', {type: String, required: true, desc: 'Destination namespace'});
  }

  async prompting() {
    this.answers = this.config.get(MODULE_NAME) || {};

    const prompts = [
      {
        type: 'input',
        name: 'objectName',
        message: 'Enter the name for the Services configmap',
        default: this.answers.objectName || MODULE_NAME
      },
      {
        type: 'input',
        name: 'cdogsApiUrl',
        message: 'Enter the CDOGS API Url',
        default: this.answers.cdogsApiUrl || 'https://cdogs-master-idcqvl-dev.pathfinder.gov.bc.ca/'
      },
      {
        type: 'input',
        name: 'cdogsTokenUrl',
        message: 'Enter the CDOGS Token Url',
        default: this.answers.cdogsTokenUrl || 'https://sso-dev.pathfinder.gov.bc.ca/auth/realms/jbd6rnxw/protocol/openid-connect/token'
      }

    ];

    return this.prompt(prompts).then(answers => {
      this.answers = answers;
    });
  }

  configuring() {
    super.configuring();
    this.config.set(MODULE_NAME, this.answers);
    this.config.save();
  }

  writing() {
    this.log(chalk.blue(`\n${MODULE_NAME} generator...\n`));
    if (this.canCreate(this.options.destination, 'configmap', this.answers.objectName)) {
      const pairs = [];
      pairs.push({name: 'CDOGS_TOKENURL', value: this.answers.cdogsApiUrl});
      pairs.push({name: 'CDOGS_APIURL', value: this.answers.cdogsTokenUrl});
      this.createConfigMap(this.options.destination, this.answers.objectName, ...pairs);
    }
  }
};
