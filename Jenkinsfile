pipeline {
    agent any
    
    environment {
        IMAGE_NAME = 'mind-reader-app'
        IMAGE_TAG = "${BUILD_NUMBER}"
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        
        stage('Build Docker Image') {
            steps {
                script {
                    sh "docker build -t ${IMAGE_NAME}:${IMAGE_TAG} ."
                    sh "docker tag ${IMAGE_NAME}:${IMAGE_TAG} ${IMAGE_NAME}:latest"
                }
            }
        }
        
        stage('Run Tests') {
            steps {
                sh 'echo "Running tests..." # Add your tests here'
            }
        }
        
        stage('Deploy') {
            steps {
                script {
                    // Stop existing container if running
                    sh "docker stop ${IMAGE_NAME} || true"
                    sh "docker rm ${IMAGE_NAME} || true"
                    
                    // Run new container
                    sh "docker run -d --name ${IMAGE_NAME} -p 3000:3000 ${IMAGE_NAME}:latest"
                }
            }
        }
    }
    
    post {
        always {
            // Clean up unused Docker images
            sh 'docker image prune -f'
        }
        success {
            echo 'Pipeline succeeded!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}