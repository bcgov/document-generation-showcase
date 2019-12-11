'use strict';
const Generator = require('../oc-generator');
const chalk = require('chalk');

module.exports = class extends Generator {
  async prompting() {
    await super.prompting();

    this.answers = this.config.get('init-env') || {};

    const prompts = [
      {
        type: 'input',
        name: 'namespace',
        message: 'Enter the destination namespace',
        default: this.answers.namespace || this.namespaces.dev
      }
    ];

    return this.prompt(prompts).then(answers => {
      this.answers = answers;
    });
  }

  createAppKeycloakSecret() {
    this.composeWith(require.resolve('../app-keycloak-secret'), {destination: this.answers.namespace});
  }

  createCdogsServiceSecret() {
    this.composeWith(require.resolve('../cdogs-service-secret'), {destination: this.answers.namespace});
  }

  createDgrscFrontendConfig() {
    this.composeWith(require.resolve('../dgrsc-frontend-config'), {destination: this.answers.namespace});
  }

  createDgrscServerConfig() {
    this.composeWith(require.resolve('../dgrsc-server-config'), {destination: this.answers.namespace});
  }

  createDgrscServicesConfig() {
    this.composeWith(require.resolve('../dgrsc-services-config'), {destination: this.answers.namespace});
  }

  letThemKNow() {
    this.log(chalk.blueBright('Start the generators...'));
  }

  configuring() {
    super.configuring();
    this.config.set('init-env', this.answers);
    this.config.save();
  }
};
