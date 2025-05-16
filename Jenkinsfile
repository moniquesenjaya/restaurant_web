pipeline {
    agent any

    tools {
        nodejs 'Node24'
    }

    environment {
        BUILD_VERSION = "${env.BUILD_NUMBER}"
    }

    triggers {
        pollSCM('H/5 * * * *') {
            ignorePostCommitHooks()
            branches {
                branch('origin/main')
            }
    }
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/moniquesenjaya/restaurant_web.git'
            }
        }

        stage('Build') {
            steps {
                bat 'echo Building version %BUILD_VERSION%'
                bat 'npm install'
                bat 'npm run build'
            }
        }

        stage('Test') {
            steps {
                bat 'echo Testing version %BUILD_VERSION%'
            }
        }

    }

    post {
        success {
            archiveArtifacts artifacts: 'build/**', fingerprint: true
        }
        failure {
            echo 'Build failed!'
        }
    }
}