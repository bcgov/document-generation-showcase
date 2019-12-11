'use strict';
const Generator = require('../oc-generator');
const chalk = require('chalk');

const MODULE_NAME = 'dgrsc-frontend-config';

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
        message: 'Enter the name for the frontend configmap',
        default: this.answers.objectName || MODULE_NAME
      },
      {
        type: 'input',
        name: 'clientId',
        message: 'Enter the Frontend Keycloak Client Id',
        default: this.answers.clientId || 'dgrsc-frontend'
      },
      {
        type: 'input',
        name: 'realm',
        message: 'Enter the Frontend Keycloak Realm',
        default: this.answers.realm || '98r0z7rz'
      },
      {
        type: 'input',
        name: 'serverUrl',
        message: 'Enter the Frontend Keycloak Server Url',
        default: this.answers.serverUrl || 'https://sso-dev.pathfinder.gov.bc.ca/auth'
      },
      {
        type: 'input',
        name: 'apiPath',
        message: 'Enter the Frontend Api Path (no leading /)',
        default: this.answers.apiPath || 'api/v1'
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
      pairs.push({name: 'FRONTEND_KC_CLIENTID', value: this.answers.clientId});
      pairs.push({name: 'FRONTEND_KC_REALM', value: this.answers.realm});
      pairs.push({name: 'FRONTEND_KC_SERVERURL', value: this.answers.serverUrl});
      pairs.push({name: 'FRONTEND_APIPATH', value: this.answers.apiPath});
      this.createConfigMap(this.options.destination, this.answers.objectName, ...pairs);
    }
  }
};
