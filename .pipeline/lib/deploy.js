'use strict';
const {OpenShiftClientX} = require('pipeline-cli')
const path = require('path');

module.exports = (settings)=>{
  const phases = settings.phases
  const options= settings.options
  const phase=options.env
  const changeId = phases[phase].changeId
  const oc=new OpenShiftClientX(Object.assign({'namespace':phases[phase].namespace}, options));
  const templatesLocalBaseUrl =oc.toFileUrl(path.resolve(__dirname, '../../openshift'))
  var objects = []

   objects.push(...oc.processDeploymentTemplate(`${templatesLocalBaseUrl}/app.dc.yaml`, {
    'param':{
      'APP_NAME': phases[phase].name,
      'JOB_NAME': phases[phase].changeId,
      'VERSION': phases[phase].tag,
      'NAMESPACE': phases[phase].namespace,
      'ROUTE_HOST': `${phases[phase].name}-${phases[phase].phase}.pathfinder.gov.bc.ca`,
      'ROUTE_PATH': `/${phases[phase].changeId}`
    }
  }))

  oc.applyRecommendedLabels(objects, phases[phase].name, phase, `${changeId}`, phases[phase].instance)
  oc.importImageStreams(objects, phases[phase].tag, phases.build.namespace, phases.build.tag)
  oc.applyAndDeploy(objects, phases[phase].instance)
}
