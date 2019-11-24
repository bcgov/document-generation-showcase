// Stash Names
def COVERAGE_STASH = 'test-coverage'
def SONARQUBE_URL_INT = 'http://sonarqube:9000'

pipeline {
    agent none
    options {
        disableResume()
    }
    stages {
        stage('Build') {
            agent { label 'build' }
            steps {
                script {
                    def filesInThisCommitAsString = sh(script:"git diff --name-only HEAD~1..HEAD | grep -v '^.jenkins/' || echo -n ''", returnStatus: false, returnStdout: true).trim()
                    def hasChangesInPath = (filesInThisCommitAsString.length() > 0)
                    echo "${filesInThisCommitAsString}"
                    if (!currentBuild.rawBuild.getCauses()[0].toString().contains('UserIdCause') && !hasChangesInPath){
                        currentBuild.rawBuild.delete()
                        error("No changes detected in the path ('^.jenkins/')")
                    }
                }
                echo "Aborting all running jobs ..."
                script {
                    abortAllPreviousBuildInProgress(currentBuild)
                }
                echo "Building ..."
                sh "cd .pipeline && ./npmw ci && ./npmw run build -- --pr=${CHANGE_ID}"
            }
        }
        stage('SonarQube (Test)') {
          agent any
          steps {
            script {
              dir('app/frontend') {
                try {
                  timeout(10) {
                    echo 'Installing NPM Dependencies...'
                    sh 'npm ci'

                    echo "Testing app/frontend..."
                    sh 'npm run test:unit'
                  }
                } catch (e) {
                  echo "testing app/frontend failed"
                  throw e
                }
              }
            }
          }
          post {
            success {
              stash name: COVERAGE_STASH, includes: 'app/frontend/coverage/**'

              echo 'All Tests passed'
            }
            failure {
              echo 'Some Tests failed'
            }
          }
        }

        stage('SonarQube (Publish)') {
          agent any
          steps {
            script {
              openshift.withCluster() {
                openshift.withProject('wfezkf-tools') {

                  unstash COVERAGE_STASH

                  echo 'Performing SonarQube static code analysis...'
                  sh """
                  sonar-scanner \
                    -Dsonar.host.url='${SONARQUBE_URL_INT}' \
                    -Dsonar.projectKey='dgrsc-${CHANGE_ID}' \
                    -Dsonar.projectName='Document Generation Showcase (${CHANGE_ID.toUpperCase()})'
                  """
                }
              }
            }
          }
        }

        stage('Deploy (DEV)') {
            agent { label 'deploy' }
            steps {
                echo "Deploying ..."
                sh "cd .pipeline && ./npmw ci && ./npmw run deploy -- --pr=${CHANGE_ID} --env=dev"
            }
        }

        stage('Deploy (TEST)') {
            agent { label 'deploy' }
            when {
                expression { return env.CHANGE_TARGET == 'master';}
                beforeInput true
            }
            input {
                message "Should we continue with deployment to TEST?"
                ok "Yes!"
            }
            steps {
                echo "Deploying ..."
                sh "cd .pipeline && ./npmw ci && ./npmw run deploy -- --pr=${CHANGE_ID} --env=test"
            }
        }

        stage('Deploy (PROD)') {
            agent { label 'deploy' }
            when {
                expression { return env.CHANGE_TARGET == 'master';}
                beforeInput true
            }
            input {
                message "Should we continue with deployment to TEST?"
                ok "Yes!"
            }
            steps {
                echo "Deploying ..."
                sh "cd .pipeline && ./npmw ci && ./npmw run deploy -- --pr=${CHANGE_ID} --env=prod"
            }
        }
    }
}
