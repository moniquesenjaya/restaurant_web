pipeline {
    agent any

    tools {
        nodejs 'Node24' // Must match the name from Jenkins tool config
    }

    stages {
        stage('Build') {
            steps {
                git 'https://github.com/moniquesenjaya/restaurant_web.git'
                bat 'npm install'
                bat 'npm run build'
            }
        }
    }
}
