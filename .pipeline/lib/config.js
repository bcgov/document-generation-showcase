'use strict';
const options= require('@bcgov/pipeline-cli').Util.parseArguments()
const changeId = options.pr //aka pull-request
const version = '1.0.0'
const name = 'dgrsc'

const phases = {
  build: {
    namespace:'wfezkf-tools'    ,
    name: `${name}`,
    phase: 'build'  ,
    changeId:changeId,
    suffix: `-build-${changeId}`  ,
    instance: `${name}-build-${changeId}`  ,
    version:`${version}-${changeId}`,
    tag:`build-${version}-${changeId}`},
  dev: {
    namespace:'wfezkf-dev'    ,
    name: `${name}`,
    phase: 'dev'  ,
    changeId:changeId,
    suffix: `-dev-${changeId}`  ,
    instance: `${name}-dev-${changeId}`  ,
    version:`${version}-${changeId}`,
    tag:`dev-${version}-${changeId}`
  },
  test: {
    namespace:'wfezkf-test'    ,
    name: `${name}`,
    phase: 'test'  ,
    changeId:changeId,
    suffix: `-test`  ,
    instance: `${name}-test`  ,
    version:`${version}`,
    tag:`test-${version}`
  },
  prod: {
    namespace:'wfezkf-prod'    ,
    name: `${name}`,
    phase: 'prod'  ,
    changeId:changeId,
    suffix: `-prod`  ,
    instance: `${name}-prod`  ,
    version:`${version}`,
    tag:`prod-${version}`
  },
};

// This callback forces the node process to exit as failure.
process.on('unhandledRejection', (reason) => {
  console.log(reason);
  process.exit(1);
});

module.exports = exports = {phases, options};
