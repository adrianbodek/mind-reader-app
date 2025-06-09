pipeline {
    agent any

    environment {
        IMAGE_NAME = 'mind-reader-app'
        // Automatyczna wersja: numer builda + skrót commita
        IMAGE_TAG = "${BUILD_NUMBER}-${GIT_COMMIT.take(7)}"
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
                sh "docker build -t ${IMAGE_NAME}:${IMAGE_TAG} ."
                sh "docker tag ${IMAGE_NAME}:${IMAGE_TAG} ${IMAGE_NAME}:latest"
            }
        }
        stage('Run Tests') {
            steps {
                sh 'echo "Running tests..." # Add your tests here'
            }
        }
        stage('Deploy') {
            steps {
                sh "docker stop ${IMAGE_NAME} || true"
                sh "docker rm ${IMAGE_NAME} || true"
                // Uruchamiamy kontener z wersją latest, ale możesz też podmienić na IMAGE_TAG
                sh "docker run -d --name ${IMAGE_NAME} -p 3000:3000 ${IMAGE_NAME}:latest"
            }
        }
    }
    post {
        always {
            sh 'docker image prune -f'
        }
        success {
            echo "Pipeline succeeded! Version: ${IMAGE_TAG}"
            emailext (
                subject: "Jenkins SUCCESS: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: """Gratulacje! Build zakończony sukcesem.

Wersja obrazu: ${IMAGE_TAG}
Sprawdź szczegóły: ${env.BUILD_URL}

Pozdrawiam,
Twój Jenkins
""",
                to: 'adrianbodek00@gmail.com'
            )
        }
        failure {
            echo "Pipeline failed! Version: ${IMAGE_TAG}"
            emailext (
                subject: "Jenkins FAILURE: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: """Build zakończył się błędem!

Wersja obrazu: ${IMAGE_TAG}
Sprawdź szczegóły: ${env.BUILD_URL}

Pozdrawiam,
Twój Jenkins
""",
                to: 'adrianbodek00@gmail.com'
            )
        }
    }
}