pipeline {
    agent any

    tools {
        nodejs 'Node24'
    }

    environment {
        BUILD_VERSION = "${env.BUILD_NUMBER}"
    }


    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/moniquesenjaya/restaurant_web.git'
            }
        }

        stage('Build') {
            steps {
                bat 'echo Building version %BUILD_VERSION%'
                bat 'npm install'
                bat 'npm run build'
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