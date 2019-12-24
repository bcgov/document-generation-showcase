
# Document Generation Showcase [![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE) [![Quality Gate](https://sonarqube-wfezkf-tools.pathfinder.gov.bc.ca/api/badges/gate?key=document-generation-showcase-master)](https://sonarqube-wfezkf-tools.pathfinder.gov.bc.ca/dashboard?id=document-generation-showcase-master)

[![Bugs](https://sonarqube-wfezkf-tools.pathfinder.gov.bc.ca/api/badges/measure?key=document-generation-showcase-master&metric=bugs)](https://sonarqube-wfezkf-tools.pathfinder.gov.bc.ca/dashboard?id=document-generation-showcase-master)
[![Vulnerabilities](https://sonarqube-wfezkf-tools.pathfinder.gov.bc.ca/api/badges/measure?key=document-generation-showcase-master&metric=vulnerabilities)](https://sonarqube-wfezkf-tools.pathfinder.gov.bc.ca/dashboard?id=document-generation-showcase-master)
[![Code Smells](https://sonarqube-wfezkf-tools.pathfinder.gov.bc.ca/api/badges/measure?key=document-generation-showcase-master&metric=code_smells)](https://sonarqube-wfezkf-tools.pathfinder.gov.bc.ca/dashboard?id=document-generation-showcase-master)
[![Coverage](https://sonarqube-wfezkf-tools.pathfinder.gov.bc.ca/api/badges/measure?key=document-generation-showcase-master&metric=coverage)](https://sonarqube-wfezkf-tools.pathfinder.gov.bc.ca/dashboard?id=document-generation-showcase-master)
[![Lines](https://sonarqube-wfezkf-tools.pathfinder.gov.bc.ca/api/badges/measure?key=document-generation-showcase-master&metric=lines)](https://sonarqube-wfezkf-tools.pathfinder.gov.bc.ca/dashboard?id=document-generation-showcase-master)
[![Duplication](https://sonarqube-wfezkf-tools.pathfinder.gov.bc.ca/api/badges/measure?key=document-generation-showcase-master&metric=duplicated_lines_density)](https://sonarqube-wfezkf-tools.pathfinder.gov.bc.ca/dashboard?id=document-generation-showcase-master)

Documentation, Code Templates and a Showcase application to demonstrate features of the Natural Resources Common Document Generation Service

To learn more about **Common Services** available including [hosted email](https://github.com/bcgov/common-hosted-email-service), [messaging](https://github.com/bcgov/nr-messaging-service-showcase) and [document generation](https://github.com/bcgov/document-generation-showcase) and to see them in action, visit the [Common Services Showcase](https://bcgov.github.io/common-service-showcase/) page.

## Directory Structure

    .github/                   - PR and Issue templates
    app/                       - Node.js backend web application
    └── frontend               - Vue.js frontend web application
    openshift/                 - OpenShift-deployment specific files
    CODE-OF-CONDUCT.md         - Code of Conduct
    CONTRIBUTING.md            - Contributing Guidelines
    Jenkinsfile                - Top-level Pipeline
    Jenkinsfile.cicd           - Pull-Request Pipeline
    LICENSE                    - License
    sonar-project.properties   - SonarQube Scanner settings

## Documentation

* [Application Readme](app/README.md)
* [Openshift Readme](openshift/README.md)
* [Devops Tools Setup](https://github.com/bcgov/nr-showcase-devops-tools)
* [Showcase Team Roadmap](https://github.com/bcgov/nr-get-token/wiki/Product-Roadmap)

## Quick Start Dev Guide

You can quickly run this application in production mode after cloning with the following commands (assuming you have already set up local configuration as well). Refer to the [Application Readme](app/README.md) for more details.

    cd app
    npm run all:install
    npm run all:build
    npm run serve

## Getting Help or Reporting an Issue

To report bugs/issues/features requests, please file an issue.

## How to Contribute

If you would like to contribute, please see our [contributing](CONTRIBUTING.md) guidelines.

Please note that this project is released with a [Contributor Code of Conduct](CODE-OF-CONDUCT.md). By participating in this project you agree to abide by its terms.

## License

    Copyright 2019 Province of British Columbia

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
