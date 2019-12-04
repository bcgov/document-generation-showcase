'use strict';
const {OpenShiftClientX} = require('pipeline-cli')
const path = require('path');

module.exports = (settings)=>{
  const phases = settings.phases
  const options = settings.options
  const oc=new OpenShiftClientX(Object.assign({'namespace':phases.build.namespace}, options));
  const phase='dev'
  let objects = []
  const templatesLocalBaseUrl =oc.toFileUrl(path.resolve(__dirname, '../../openshift'))

   objects.push(...oc.processDeploymentTemplate(`${templatesLocalBaseUrl}/app.bc.yaml`, {
    'param':{
      'APP_NAME': phases[phase].name,
      'JOB_NAME': phases[phase].changeId,
      'VERSION': phases[phase].tag,
      'NAMESPACE': phases[phase].namespace,
      'SOURCE_REPO_URL': oc.git.http_url,
      'SOURCE_REPO_REF': oc.git.ref
    }
  }))
  console.log(JSON.stringify(objects, null, 2))
  oc.applyRecommendedLabels(objects, phases[phase].name, phase, phases[phase].changeId, phases[phase].instance)
  oc.applyAndBuild(objects)
}
