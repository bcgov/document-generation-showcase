'use strict';
const Generator = require('yeoman-generator');

const chalk = require('chalk');
const {spawnSync} = require('child_process');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.option('prefix', {type: String, required: false, desc: 'Openshift Namespaces Prefix'});

    this.checkLogin = function () {
      const whoAmI = spawnSync(
        'oc',
        ['whoami'],
        {encoding: 'utf-8'}
      );
      // eslint-disable-next-line no-negated-condition
      if (whoAmI.status !== 0) {
        this.env.error(
          'You are not authenticated in an OpenShift cluster.\nPlease run \'oc login ...\' command copied from the Web Console:\nhttps://console.pathfinder.gov.bc.ca:8443/console/command-line\n'
        );
        return false;
      }
      return true;
    };

    this.isNamespaceAdmin = function (namespace) {
      if (this.checkLogin()) {
        const canICreateRoleBinding = spawnSync(
          'oc',
          ['-n', namespace, 'auth', 'can-i', 'create', 'rolebinding'],
          {encoding: 'utf-8'}
        );

        if (canICreateRoleBinding.status !== 0) {
          this.env.error(
            `It seems like you do not have admin privilege in the project '${chalk.red(
              namespace
            )}'. Please check that the namespace is correct.\nTry running the following command:\n${canICreateRoleBinding.args &&
            canICreateRoleBinding.args.join(' ')}`
          );
          return false;
        }
        return true;
      }
      return false;
    };

    this.deleteObject = function (namespace, objectType, objectName) {
      const obj = spawnSync(
        'oc',
        [
          '-n',
          namespace,
          'delete',
          objectType,
          objectName
        ],
        {encoding: 'utf-8'}
      );
      if (obj.status === 0) {
        // show response from openshift
        this.log(obj.stdout);
      } else {
        if (obj.args && obj.args.length) {
          this.log(obj.args.join(' '));
        }
        this.log(obj.stdout);
        this.log(obj.stderr);
        this.env.error(
          `Error deleting ${objectType}/${objectName} from ${namespace}.`
        );
      }
    };

    this.findObject = function (namespace, objectType, objectName) {
      const obj = spawnSync(
        'oc',
        [
          '-n',
          namespace,
          'get',
          objectType,
          objectName
        ],
        {encoding: 'utf-8'}
      );
      return (obj.status === 0);
    };

    this.canCreate = function (namespace, objectType, objectName) {
      let result = false;
      if (this.isNamespaceAdmin(namespace)) {
        result = true;
        if (this.findObject(namespace, objectType, objectName)) {
          this.log(chalk.red(`Cannot create ${namespace} ${objectType}/${objectName}.`));
          this.log(chalk.red(`  ${objectType}/${objectName} already exists.`));
          this.log(`  To delete run\n    ${chalk.yellow(`yo dgrsc:delete-object --type ${objectType} --name ${objectName} --destination ${namespace}`)}\n`);
          result = false;
        }
      }
      return result;
    };

    this.createSecret = function (namespace, objectName, username, password) {
      const obj = spawnSync(
        'oc',
        [
          '-n',
          namespace,
          'create',
          'secret',
          'generic',
          objectName,
          `--from-literal=username=${username}`,
          `--from-literal=password=${password}`
        ],
        {encoding: 'utf-8'}
      );
      // eslint-disable-next-line no-negated-condition
      if (obj.status !== 0) {
        if (obj.args && obj.args.length) {
          this.log(obj.args.join(' '));
        }

        this.log(obj.stdout);
        this.log(obj.stderr);
        this.env.error(
          'Error creating the secret.'
        );
      } else {
        // show response from openshift
        this.log(chalk.green(obj.stdout));
      }
    };

    this.createConfigMap = function (namespace, objectName, ...pairs) {
      const args = [
        '-n',
        namespace,
        'create',
        'configmap',
        objectName
      ];

      pairs.forEach((p) => {
        args.push(`--from-literal=${p.name}=${p.value}`);
      });

      const obj = spawnSync(
        'oc',
        args,
        {encoding: 'utf-8'}
      );
      // eslint-disable-next-line no-negated-condition
      if (obj.status !== 0) {
        if (obj.args && obj.args.length) {
          this.log(obj.args.join(' '));
        }

        this.log(obj.stdout);
        this.log(obj.stderr);
        this.env.error(
          'Error creating the configmap.'
        );
      } else {
        // show response from openshift
        this.log(chalk.green(obj.stdout));
      }
    };
  }

  async prompting() {
    this.namespaces = this.config.get('namespaces') || {};
    let prefix = this.namespaces.prefix || this.options.prefix;

    await this.prompt([
      {
        type: 'input',
        name: 'prefix',
        message: 'Enter your namespace prefix',
        default: prefix
      }
    ]).then(response => {
      prefix = response.prefix;
    });

    const prompts = [
      {
        type: 'input',
        name: 'tools',
        message: 'Enter your tools namespace',
        default: this.namespaces.tools || `${prefix}-tools`
      },
      {
        type: 'input',
        name: 'dev',
        message: 'Enter your dev namespace',
        default: this.namespaces.dev || `${prefix}-dev`
      },
      {
        type: 'input',
        name: 'test',
        message: 'Enter your test namespace',
        default: this.namespaces.test || `${prefix}-test`
      },
      {
        type: 'input',
        name: 'prod',
        message: 'Enter your prod namespace',
        default: this.namespaces.prod || `${prefix}-prod`
      }
    ];

    return this.prompt(prompts).then(answers => {
      // To access props later use this.props.someAnswer;
      this.namespaces = {...answers, prefix};
    });
  }

  configuring() {
    if (this.namespaces) {
      this.config.set('namespaces', this.namespaces);
      this.config.save();
    }
  }
};
