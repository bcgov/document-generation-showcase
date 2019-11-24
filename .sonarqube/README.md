## SonarQube

SonarQube should be installed and configured first, as the Jenkins will run the pipeline which will may require SonarQube.  So, stand up and configure SonarQube first.

SonarQube is a static analysis tool which assists with improving and maintaining code quality. For this tool to work, you will need the SonarQube server, as well as an agent that runs the sonar-scanner (this can be local or in Jenkins).

### SonarQube Server Setup

To deploy a SonarQube server instance to our tools project we simply leverage the prebuilt server image provided by the BCDevOps organization found on the [BCDevOps SonarQube repository](https://github.com/BCDevOps/sonarqube).

We outline below the rapid startup steps to get SonarQube Server setup. Refer to the original repository for more details if necessary.

#### SonarQube Deploy

You will need to use the `sonarqube-postgresql-template.yaml` file in order to deploy it to openshift. This will deploy BOTH the PostgreSQL database AND the SonarQube server.

*Note: At the time of writing, the master branch of BCDevOps SonarQube repo was at commit `bbb9f62e29706b61382cf24d7ad7e08f2476a01f`.  And the template was at commit `bc80961d75eed66ec70ca022a6444963341fb39f`.*

Deploying the database is done with the following:

```sh
oc -n $tools new-app -f https://raw.githubusercontent.com/BCDevOps/sonarqube/bc80961d75eed66ec70ca022a6444963341fb39f/sonarqube-postgresql-template.yaml --param=SONARQUBE_VERSION=6.7.5
```

Let the SonarQube pods spin up, you can then go to `https://sonarqube-<$tools>.pathfinder.gov.bc.ca` and watch until SonarQube is ready.  Now you can set the admin password.

#### Admin Password

The SonarQube server instance is created with standard insecure credentials (User: `admin`, PW:). This should be reset to something stronger and stored in an OpenShift secret so authorized developers can find it.

The BCDevOps SonarQube repo provides a script that will generate a random PW, set it in SonarQube, and create a secret. This can be found under the  `/provisioning` folder of the cloned BCDevOps repo.

In order to directly get the password reset script, run the following:

```sh
curl https://raw.githubusercontent.com/BCDevOps/sonarqube/bbb9f62e29706b61382cf24d7ad7e08f2476a01f/provisioning/updatesqadminpw.sh > updatesqadminpw.sh
```

Then simply run the following script and follow its instructions. Make sure you save the new password in an OpenShift secret or equivalent!  Ensure that the SonarQube app is fully deployed and operational before running this script.

```sh
chmod +x updatesqadminpw.sh && ./updatesqadminpw.sh
```

Go to `https://sonarqube-<$tools>.pathfinder.gov.bc.ca` and log in as `admin` with the new password (it is stored in sonarqube-admin-password secret).
