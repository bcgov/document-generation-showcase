'use strict';
const Generator = require('../oc-generator');
const chalk = require('chalk');

const MODULE_NAME = 'dgrsc-server-config';

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
        message: 'Enter the name for the (Backend) Server configmap',
        default: this.answers.objectName || MODULE_NAME
      },
      {
        type: 'input',
        name: 'realm',
        message: 'Enter the (Backend) Server Keycloak Realm',
        default: this.answers.realm || '98r0z7rz'
      },
      {
        type: 'input',
        name: 'serverUrl',
        message: 'Enter the (Backend) Server Keycloak Server Url',
        default: this.answers.serverUrl || 'https://sso-dev.pathfinder.gov.bc.ca/auth'
      },
      {
        type: 'input',
        name: 'logLevel',
        message: 'Enter the (Backend) Server Logging Level',
        default: this.answers.logLevel || 'info'
      },
      {
        type: 'input',
        name: 'morganFormat',
        message: 'Enter the (Backend) Server Morgan Format',
        default: this.answers.morganFormat || 'dev'
      },
      {
        type: 'input',
        name: 'port',
        message: 'Enter the (Backend) Server Port',
        default: this.answers.port || '8888'
      },
      {
        type: 'input',
        name: 'bodyLimit',
        message: 'Enter the (Backend) Server Body Limit',
        default: this.answers.bodyLimit || '30mb'
      },
      {
        type: 'input',
        name: 'apiPath',
        message: 'Enter the (Backend) Server Api Path (use leading /)',
        default: this.answers.apiPath || '/api/v1'
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
      pairs.push({name: 'SERVER_KC_REALM', value: this.answers.realm});
      pairs.push({name: 'SERVER_KC_SERVERURL', value: this.answers.serverUrl});
      pairs.push({name: 'SERVER_LOGLEVEL', value: this.answers.logLevel});
      pairs.push({name: 'SERVER_MORGANFORMAT', value: this.answers.morganFormat});
      pairs.push({name: 'SERVER_PORT', value: this.answers.port});
      pairs.push({name: 'SERVER_BODYLIMIT', value: this.answers.bodyLimit});
      pairs.push({name: 'SERVER_APIPATH', value: this.answers.apiPath});
      this.createConfigMap(this.options.destination, this.answers.objectName, ...pairs);
    }
  }
};
