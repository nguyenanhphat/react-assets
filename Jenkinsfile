pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                script {
                    sh 'node -v'
                    echo 'Build BE files'
                    dir('backend') {
                        sh 'npm install'
                        sh 'npm run build-uat'
                        sh 'rm -r node_modules'
                    }
                    echo 'Build FE files'
                    dir('frontend') {
                        sh 'npm install'
                        sh 'npm run build-uat'
                        sh 'rm -r node_modules'
                    }
                }
            }
        }
        stage('Test') {
            steps {
                echo 'No test yet!'
            }
        }
        stage('Deploy') {
            steps {
                script {
                    dir('C:/webdeploy/UAT_assetsapi') {
                        sh '''
                        npm i -g pm2
                        pm2 stop api --silent
                        pm2 delete api --silent
                        '''
                    }

                    sh 'node -v'
                    echo 'Clear all files in api folder'
                    dir('C:/webdeploy/UAT_assetsapi') {
                        sh '''
                        shopt -s extglob
                        rm -r -- !(web.config)
                        '''
                    }

                    echo 'Copy built files to BE folder'
                    sh 'cp backend/dist/development/* C:/webdeploy/UAT_assetsapi/ -r'

                    echo 'Start BE'
                    dir('C:/webdeploy/UAT_assetsapi') {
                        sh '''
                        npm install
                        npm run migrate
                        '''
                    }

                    echo 'Clear all files in FE folder'
                    dir('C:/webdeploy/UAT_assets') {
                        sh '''
                        shopt -s extglob
                        rm -r -- !(web.config)
                        '''
                    }
                    echo 'Copy built files to FE folder'
                    sh 'cp frontend/build/* C:/webdeploy/UAT_assets/ -r'

                    dir('C:/webdeploy/UAT_assetsapi') {
                        sh '''
                        pm2 start app.js --name "api"
                        pm2 ls
                        '''
                    }
                }
            }
        }
    }
}
