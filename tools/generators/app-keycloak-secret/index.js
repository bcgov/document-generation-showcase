'use strict';
const Generator = require('../oc-generator');
const chalk = require('chalk');

const MODULE_NAME = 'app-keycloak-secret';

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
        message: 'Enter the name for the backend/app keycloak secret',
        default: this.answers.objectName || MODULE_NAME
      },
      {
        type: 'input',
        name: 'clientId',
        message: 'Enter the backend/app keycloak client id',
        default: this.answers.clientId || 'dgrsc'
      },
      {
        type: 'password',
        mask: '*',
        name: 'clientSecret',
        message: 'Enter the backend/app keycloak client secret',
        default: this.answers.clientSecret
      },

    ];

    return this.prompt(prompts).then(answers => {
      this.answers = answers;
    });
  }

  configuring() {
    super.configuring();
    // do not save the secret!
    const savedAnswers = {...this.answers};
    delete savedAnswers.clientSecret;
    this.config.set(MODULE_NAME, savedAnswers);
    this.config.save();
  }

  writing() {
    this.log(chalk.blue(`\n${MODULE_NAME} generator...\n`));
    if (this.canCreate(this.options.destination, 'secret', this.answers.objectName)) {
      this.createSecret(this.options.destination, this.answers.objectName, this.answers.clientId, this.answers.clientSecret);
    }
  }
};
