pipeline {
    agent any

    options {
        disableConcurrentBuilds()
    }

    triggers {
        pollSCM('H H * * *')
    }

    environment {
        IMAGE_NAME = 'harbor.precia.site/precia/precia-landing-page'
        HARBOR_CREDS = credentials('harbor-registry')
        DOCKER_CONFIG = "${WORKSPACE}/.docker-jenkins"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Lint & Type Check') {
            agent {
                docker {
                    image 'node:20-slim'
                    reuseNode true
                }
            }
            environment {
                // prisma.config.ts resolves DATABASE_URL eagerly for `prisma generate`
                // (triggered by postinstall), even though generate never opens a connection.
                DATABASE_URL = 'postgresql://placeholder:placeholder@localhost:5432/placeholder'
            }
            steps {
                sh '''
                    npm ci
                    npm run lint
                    npx tsc --noEmit
                '''
            }
        }

        stage('Build & Push Image') {
            steps {
                script {
                    def isMain = env.GIT_BRANCH == 'origin/main'
                    def tag = isMain ? 'latest' : 'dev'
                    env.IMAGE_TAG = "${env.IMAGE_NAME}:${tag}"
                    env.IMAGE_BUILD = "${env.IMAGE_NAME}:${tag}-${env.BUILD_NUMBER}"
                    env.NEXT_PUBLIC_SITE_URL = isMain ? 'https://precia.site' : 'https://landing-dev.precia.site'
                }
                sh '''
                    mkdir -p "$DOCKER_CONFIG"
                    echo "$HARBOR_CREDS_PSW" | docker login harbor.precia.site -u "$HARBOR_CREDS_USR" --password-stdin
                    DOCKER_BUILDKIT=1 docker build \
                        --build-arg NEXT_PUBLIC_SITE_URL="$NEXT_PUBLIC_SITE_URL" \
                        -t "$IMAGE_TAG" -t "$IMAGE_BUILD" -f Dockerfile .
                    docker push "$IMAGE_TAG"
                    docker push "$IMAGE_BUILD"
                '''
            }
        }

        stage('Deploy to DEV') {
            when { expression { env.GIT_BRANCH == 'origin/dev' } }
            steps {
                sshPublisher(publishers: [
                    sshPublisherDesc(
                        configName: 'workstation-1',
                        transfers: [
                            sshTransfer(
                                sourceFiles: '',
                                execCommand: """
                                    set -e
                                    cd /srv/precia/apps/precia-landing-page
                                    sed -i "s|^\\( *image: \\).*|\\1${env.IMAGE_TAG}|" docker-compose.yml
                                    docker compose pull
                                    docker compose up -d --force-recreate
                                    docker images --format "{{.Repository}}:{{.Tag}}" | grep "^${env.IMAGE_NAME}:" | grep -vE ":(dev|latest)\$" | xargs -r docker rmi || true
                                """
                            )
                        ]
                    )
                ])
            }
        }

        stage('Deploy to PROD') {
            when { expression { env.GIT_BRANCH == 'origin/main' } }
            steps {
                sshPublisher(publishers: [
                    sshPublisherDesc(
                        configName: 'workstation-2',
                        transfers: [
                            sshTransfer(
                                sourceFiles: '',
                                execCommand: """
                                    set -e
                                    cd /srv/precia/apps/precia-prod/landing
                                    sed -i "s|^\\( *image: \\).*|\\1${env.IMAGE_TAG}|" docker-compose.yml
                                    docker compose pull
                                    docker compose up -d --force-recreate
                                    docker images --format "{{.Repository}}:{{.Tag}}" | grep "^${env.IMAGE_NAME}:" | grep -vE ":(dev|latest)\$" | xargs -r docker rmi || true
                                """
                            )
                        ]
                    )
                ])
            }
        }

        stage('Ping IndexNow') {
            when { expression { env.GIT_BRANCH == 'origin/main' } }
            steps {
                sh '''
                    sleep 15
                    curl -s -o /dev/null -w "IndexNow submit: HTTP %{http_code}\\n" -X POST https://api.indexnow.org/indexnow \
                        -H "Content-Type: application/json; charset=utf-8" \
                        -d '{"host":"precia.site","key":"749ba0fbb07d6a0051e445212423f5dd","keyLocation":"https://precia.site/749ba0fbb07d6a0051e445212423f5dd.txt","urlList":["https://precia.site/id","https://precia.site/en","https://precia.site/id/modul/ai-ecg","https://precia.site/en/modul/ai-ecg","https://precia.site/id/modul/ai-boo","https://precia.site/en/modul/ai-boo","https://precia.site/id/modul/ai-ortho","https://precia.site/en/modul/ai-ortho","https://precia.site/id/privacy","https://precia.site/en/privacy","https://precia.site/id/terms","https://precia.site/en/terms"]}' || true
                '''
            }
        }
    }

    post {
        always {
            sh 'docker logout harbor.precia.site || true'
            sh 'rm -rf "$DOCKER_CONFIG" || true'
        }
    }
}
