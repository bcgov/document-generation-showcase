# DGRSC - Document Generation Service Showcase Backend
DGRSC (Document Generation Service Showcase) Backend is a simple node.js wrapper around the [BC Gov. Common Document Generation Service](https://github.com/bcgov/common-document-generation-service).  The wrapper is a simple pass through to the CDOGS service, its main purpose is to hide the service client credentials from the frontend.  We host the showcase frontend from this node.js backend.

# Configuration
The DGRSC Backend will require some configuration, namely credentials to CDOGS and where to call CDOGS.  We also want to lock down our api using a JWT Token for DGRSC.  We will need to configure our DGRSC backend to authenticate using the same KeyCloak realm and client that the [frontend](../frontend) uses. All configuration for the frontend will come from the DGRSC backend, fetched by calling a configuration url (/config).

We are using the npm library: [config](https://www.npmjs.com/package/config), to configure our application.  We can either set environment variables to be picked up by [custom-environment-variables.json](./config/custom-environment-variables.json) or we can create a local configuration file (do not check into source control) such as local.json.  Please read the config library documentation to see how it overlays various environment files and uses environment variables to override those values (when provided).

**FRONTEND\_APIPATH** has no beginning '/', that is so it will always call the relative api.

#### Environment Variables

| Name | Default | Description |
| --- | --- | --- |
| FRONTEND_KC_CLIENTID | dgrsc-frontend | The name of the frontend authorization service client - Users login to this (KeyCloak) client to get authenticated and authorized to DGRSC.  See [GetOK](https://github.com/bcgov/nr-get-token) for more information |
| FRONTEND_KC_REALM | 98r0z7rz | The KeyCloak realm id |
| FRONTEND_KC_SERVERURL | https://dev.oidc.gov.bc.ca/auth | The KeyCloak authorization url |
| FRONTEND_APIPATH | api/v1 | Relative path for frontend to call backend api |
| FRONTEND_BASEPATH | /app | Base path where frontend will be hosted |
| CDOGS_CLIENT_ID | DGRSC_SERVICE_CLIENT | The name of the service client in the realm that has been granted access to CDOGS.  See [GetOK](https://github.com/bcgov/nr-get-token.git) for more information |
| CDOGS_CLIENT_SECRET | | The service client's password |
| CDOGS_TOKEN_URL | | The OpenID token url to authenticate this client |
| CDOGS_API_URL | | The CDOGS url |
| SERVER_APIPATH | | |
| SERVER_BASEPATH | | |
| SERVER_BODYLIMIT | 30mb | Set the allowed request body size (will include encoded attachments). See [body-parser limit](https://github.com/expressjs/body-parser#limit) and [bytes lib](https://www.npmjs.com/package/bytes) |
| SERVER_HOSTURL | http://localhost:8888 | The domain/base url where we will expose the api. |
| SERVER_LOGLEVEL | info | set the npm log level (verbose, debug, info, warn, error). |
| SERVER_MORGANFORMAT | dev | set the logging format for Morgan. |
| SERVER_PORT | 8888 | port for node to listen on. |
| SERVER_KC_CLIENTID | dgrsc | The name of the backend authorization service client - users authorized using frontend client, but will have backend roles.  See [GetOK](https://github.com/bcgov/nr-get-token) for more information |
| SERVER_KC_CLIENTSECRET | | The KeyCloak service client's password |
| SERVER_KC_REALM | 98r0z7rz | The KeyCloak realm id |
| SERVER_KC_SERVERURL | https://dev.oidc.gov.bc.ca/auth | The KeyCloak authorization url |

## Super Quickstart
```
npm run all:fresh-start
```

### Run tests
```
npm run all:test
```

### Lints and fixes files
```
npm run all:lint
npm run all:lint-fix
```

