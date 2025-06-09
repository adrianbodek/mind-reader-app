post {
    always {
        // Clean up unused Docker images
        sh 'docker image prune -f'
    }
    success {
        echo 'Pipeline succeeded!'
        emailext (
            subject: "Jenkins SUCCESS: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
            body: """Gratulacje! Build zakończony sukcesem.

Sprawdź szczegóły: ${env.BUILD_URL}

Pozdrawiam,
Twój Jenkins
""",
            to: 'adrianbodek00@gmail.com'
        )
    }
    failure {
        echo 'Pipeline failed!'
        emailext (
            subject: "Jenkins FAILURE: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
            body: """Build zakończył się błędem!

Sprawdź szczegóły: ${env.BUILD_URL}

Pozdrawiam,
Twój Jenkins
""",
            to: 'adrianbodek00@gmail.com'
        )
    }
}