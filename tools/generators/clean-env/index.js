'use strict';
const Generator = require('../oc-generator');
const chalk = require('chalk');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.option('destination', {type: String, required: true, desc: 'Destination namespace'});
  }

  async prompting() {

    this.answersA = this.config.get('app-keycloak-secret') || {};
    this.answersB = this.config.get('cdogs-service-secret') || {};

    this.answersC = this.config.get('dgrsc-frontend-config') || {};
    this.answersD = this.config.get('dgrsc-server-config') || {};
    this.answersE = this.config.get('dgrsc-services-config') || {};

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
        name: 'objectNameA',
        message: 'Enter the app-keycloak-secret object name',
        default: this.answersA.objectName || 'app-keycloak-secret'
      },
      {
        type: 'input',
        name: 'objectNameB',
        message: 'Enter the cdogs-service-secret object name',
        default: this.answersB.objectName || 'cdogs-service-secret'
      },
      {
        type: 'input',
        name: 'objectNameC',
        message: 'Enter the dgrsc-frontend-config object name',
        default: this.answersC.objectName || 'dgrsc-frontend-config'
      },
      {
        type: 'input',
        name: 'objectNameD',
        message: 'Enter the dgrsc-server-config object name',
        default: this.answersD.objectName || 'dgrsc-server-config'
      },
      {
        type: 'input',
        name: 'objectNameE',
        message: 'Enter the dgrsc-services-config object name',
        default: this.answersE.objectName || 'dgrsc-services-config'
      }
    ];

    return this.prompt(prompts).then(answers => {
      this.answers = answers;
    });
  }

  writing() {
    if (this.isNamespaceAdmin(this.answers.destination)) {

      const objs = [
        {type: 'secret', name: this.answers.objectNameA},
        {type: 'secret', name: this.answers.objectNameB},
        {type: 'configmap', name: this.answers.objectNameC},
        {type: 'configmap', name: this.answers.objectNameD},
        {type: 'configmap', name: this.answers.objectNameE}
      ];

      objs.forEach((o) => {
        if (this.findObject(this.answers.destination, o.type, o.name)) {
          this.deleteObject(this.answers.destination, o.type, o.name);
        } else {
          this.log(chalk.red(`Object ${o.type}/${o.name} in ${this.answers.destination} not found, cannot be deleted.`));
        }
      });

    }
  }
};
