'use strict';
const Generator = require('../oc-generator');
const chalk = require('chalk');
const fs = require('fs');
const yaml = require('js-yaml');

const MODULE_NAME = 'secret-template';

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.option('destination', {type: String, required: true, desc: 'Destination namespace'});
    this.option('template', {type: String, required: true, desc: 'Path to template'});
  }

  async prompting() {

    this.answers = this.config.get(MODULE_NAME) || {};

    try {
      let fileContents = fs.readFileSync(this.options.template, 'utf8');
      let data = yaml.safeLoad(fileContents);

      const prompts = data.parameters.map((p) => {
        const prompt = {
          type: p.type,
          name: p.name,
          message: p.description,
          default: p.value
        };
        if (p.type === 'password') {
          prompt.mask = '*';
        }
        return prompt;
      });
      console.log(data);
      return this.prompt(prompts).then(answers => {
        this.answers = answers;
      });
    } catch (e) {
      console.log(e);
    }
  }

  configuring() {
    super.configuring();

    this.config.set(MODULE_NAME, this.answers);
    this.config.save();
  }

  writing() {
    this.log(chalk.blue(`\n${MODULE_NAME} generator...\n`));
    if (this.canCreate(this.options.destination, 'secret', this.answers.OBJECT_NAME)) {
      const pairs = Object.keys(this.answers).map((a) => {
        return {name: a, value: this.answers[a]};
      });
      const output = this.process(this.options.destination, this.options.template, ...pairs);
      this.log(output);
      this.create(this.options.destination, output);
    }
  }

};
