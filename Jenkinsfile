pipeline {
    agent { docker { image 'node:14-alpine' } }

    stages {
        stage('build') {
            steps{
                echo 'building the app'
                sh 'npm install'
            }
        }
        
        stage('test') {
            steps{
                echo 'testing the app'
                sh 'npm run e2e-all'
            }
        }
        
        stage('clear') {
            steps{
                echo 'cleaning the app'
            }
        }
    }
}
