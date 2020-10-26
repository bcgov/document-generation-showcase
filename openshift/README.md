# Keycloak

Login to [dev](https://sso-dev.pathfinder.gov.bc.ca/auth/admin/98r0z7rz/console/#/realms/98r0z7rz/clients) to get client secrets or add users to groups.

## Clients

| Name | Description |
| ---- | --- |
| dgrsc | this is for the node backend to protect the calls to CDOGS.  this client contains roles |
| dgrsc-frontend | this is a **public** client for the ui, it uses dgrsc scopes to return dgrsc roles the user is in.  There are no credentials for this client, it is guarded by web-origins and allowed redirects in Keycloak.|
| dgrsc-local | configured for localhost:8888, local development. |
| dgrsc-frontend-local | configured for localhost:8888, local development.|

## Client Scope

**dgrsc** - Both the backend and frontend clients include **dgrsc** as a default client scope.

## Groups

**DGRSC Users** - maps to the dgrsc (client) role: user.  Add keycloak users to this group to get access to secured areas in DGRSC and to call the DGRSC backend (protects CDOGS calls).

Add users to the **DGRSC Users** group.

## Openshift Manual Configuration and Deployment

Assume you are logged into OpenShift and are in the repo/openshift local directory.  We will run the scripts from there.  We will use the [Document Generation Showcase (dev)](https://console.pathfinder.gov.bc.ca:8443/console/project/wfezkf-dev/overview) namespace.

### Set up environment parameters

Some notes:
**FRONTEND\_APIPATH** has no beginning '/', that is so it will always call the relative api.

``` sh
export NAMESPACE=wfezkf-dev

export APP_NAME=dgrsc
export JOB_NAME=pr-x
export REPO_NAME=document-generation-showcase
export SOURCE_REPO_URL=https://github.com/bcgov/document-generation-showcase
export SOURCE_REPO_REF=master

export SERVER_KC_CLIENTID=dgrsc
export SERVER_KC_CLIENTSECRET=<get the secret from keycloak>
export CDOGS_CLIENTID=DGRSC_SERVICE_CLIENT
export CDOGS_CLIENTSECRET=<get the secret from keycloak>

export FRONTEND_KC_CLIENTID=dgrsc-frontend
export FRONTEND_KC_REALM=98r0z7rz
export FRONTEND_KC_SERVERURL=https://dev.oidc.gov.bc.ca/auth
export FRONTEND_APIPATH=api/v2
export FRONTEND_DASHBOARDURL=https://cdogs-dashboard-dev.pathfinder.gov.bc.ca/s/cdogs/app/kibana#/dashboard/00000000-0000-0000-0000-000000000000?embed=true
export SERVER_KC_REALM=98r0z7rz
export SERVER_KC_SERVERURL=https://dev.oidc.gov.bc.ca/auth
export SERVER_LOGLEVEL=info
export SERVER_MORGANFORMAT=dev
export SERVER_PORT=8888
export SERVER_BODYLIMIT=30mb
export SERVER_APIPATH=/api/v2
export CDOGS_TOKENURL=https://sso-dev.pathfinder.gov.bc.ca/auth/realms/jbd6rnxw/protocol/openid-connect/token
export CDOGS_APIURL=https://cdogs-master-idcqvl-dev.pathfinder.gov.bc.ca/api/v2

```

### Create secrets and config map

``` sh
oc create secret -n $NAMESPACE generic app-keycloak-secret --from-literal=username=$SERVER_KC_CLIENTID --from-literal=password=$SERVER_KC_CLIENTSECRET --type=kubernetes.io/basic-auth
```

``` sh
oc create secret -n $NAMESPACE generic cdogs-service-secret --from-literal=username=$CDOGS_CLIENTID --from-literal=password=$CDOGS_CLIENTSECRET --type=kubernetes.io/basic-auth
```

``` sh
oc create configmap -n $NAMESPACE dgrsc-frontend-config --from-literal=FRONTEND_KC_CLIENTID=$FRONTEND_KC_CLIENTID --from-literal=FRONTEND_KC_REALM=$FRONTEND_KC_REALM --from-literal=FRONTEND_KC_SERVERURL=$FRONTEND_KC_SERVERURL --from-literal=FRONTEND_APIPATH=$FRONTEND_APIPATH
--from-literal=FRONTEND_DASHBOARDURL=$FRONTEND_DASHBOARDURL
```

``` sh
oc create configmap -n $NAMESPACE dgrsc-server-config --from-literal=SERVER_KC_REALM=$SERVER_KC_REALM --from-literal=SERVER_KC_SERVERURL=$SERVER_KC_SERVERURL --from-literal=SERVER_LOGLEVEL=$SERVER_LOGLEVEL --from-literal=SERVER_MORGANFORMAT=$SERVER_MORGANFORMAT --from-literal=SERVER_PORT=$SERVER_PORT --from-literal=SERVER_BODYLIMIT=$SERVER_BODYLIMIT --from-literal=SERVER_APIPATH=$SERVER_APIPATH
```

``` sh
oc create configmap -n $NAMESPACE dgrsc-services-config --from-literal=CDOGS_TOKENURL=$CDOGS_TOKENURL --from-literal=CDOGS_APIURL=$CDOGS_APIURL
```

### Run the build config

``` sh
oc -n $NAMESPACE process -f app.bc.yaml -p REPO_NAME=$REPO_NAME -p JOB_NAME=$JOB_NAME -p SOURCE_REPO_URL=$SOURCE_REPO_URL -p SOURCE_REPO_REF=$SOURCE_REPO_REF -o yaml | oc -n $NAMESPACE create -f -

oc -n $NAMESPACE start-build dgrsc-pr-x-app

oc logs build/dgrsc-pr-x-app-1 --follow
```

### Additional environment and pr specific configuration

We will expect the following two environment variables to be created and populated in the pipeline.

These will be used to populate additional configuration required for the application.

FRONTEND\_BASEPATH and SERVER\_BASEPATH  = ROUTE\_PATH
SERVER\_HOST\_URL = https://${ROUTE\_HOST}${ROUTE\_PATH}

``` sh
export ROUTE_HOST=$APP_NAME-dev.pathfinder.gov.bc.ca
export ROUTE_PATH=/pr-x
```

### Run the deployment config

``` sh
oc -n $NAMESPACE process -f app.dc.yaml -p REPO_NAME=$REPO_NAME -p JOB_NAME=$JOB_NAME -p NAMESPACE=$NAMESPACE -p APP_NAME=$APP_NAME -p ROUTE_HOST=$ROUTE_HOST -p ROUTE_PATH=$ROUTE_PATH  -o yaml | oc -n $NAMESPACE create -f -

oc -n $NAMESPACE rollout latest dc/dgrsc-pr-x-app
```

### Clean up the namespace

``` sh
oc -n $NAMESPACE delete all,template,secret,configmap,pvc,serviceaccount,rolebinding,networksecuritypolicy --selector app=$APP_NAME-$JOB_NAME
oc -n $NAMESPACE delete configmap dgrsc-frontend-config
oc -n $NAMESPACE delete configmap dgrsc-server-config
oc -n $NAMESPACE delete configmap dgrsc-services-config
oc -n $NAMESPACE delete secret app-keycloak-secret
oc -n $NAMESPACE delete secret cdogs-service-secret
```
