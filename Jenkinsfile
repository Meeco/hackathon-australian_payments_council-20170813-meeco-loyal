pipeline {
  agent none
  environment {
    SLACK_CHANNEL='sup-meeco'
    APP_NAME='meeco-banks'
  }
  stages {
    stage ('build') {
      agent {
        docker 'node:6'
      }
      steps {
        configFileProvider([configFile(fileId: 'GLOBAL_NPMRC', targetLocation: '.npmrc')]) {
        sh 'npm install'
      }
      sh "node_modules/.bin/ionic-app-scripts build --prod"
    }
    post {
      success {
          stash includes: 'www/**', name: 'build'
          zip archive: true, dir: 'www/', glob: '', zipFile: "staging_${BUILD_NUMBER}.zip"
      }
    }
  }
  stage ('Deploy') {
    steps {
      step([
        $class: 'S3BucketPublisher',
        entries: [[
          bucket: 'meeco-banks-ionic',
          noUploadOnFailure: true,
          selectedRegion: 'ap-southeast-2',
          sourceFile: 'www/**',
          storageClass: 'STANDARD',
          gzipFiles: true
        ]],
        profileName: 'meeco-s3-user-everydayinfo'
      ])
    }
  }
}
}

