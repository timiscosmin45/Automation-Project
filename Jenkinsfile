pipeline {
    agent { docker { image 'thompsnm/nodejs-chrome:latest' } }

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
                sh 'npm run e2e-test'
            }
        }
        
        stage('clear') {
            steps{
                echo 'cleaning the app'
            }
        }
    }
}
