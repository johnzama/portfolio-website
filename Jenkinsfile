pipeline {
    agent any
    
    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/johnzama/portfolio-website.git'
            }
        }
        
        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("portfolio-website:${env.BUILD_ID}")
                }
            }
        }

        stage('Run Docker Container') {
            steps {
                script {
                    docker.image("portfolio-website:${env.BUILD_ID}").run('-p 8080:80')
                }
            }
        }
    }
    
    post {
        always {
            script {
                sh 'docker ps -q --filter "status=exited" | xargs docker rm'
            }
        }
    }
}

