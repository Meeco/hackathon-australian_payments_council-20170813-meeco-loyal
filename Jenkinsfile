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
        sh 'npm run build'
        sh 'ionic cordova platform add ios android --no-interactive'
        sh 'ionic cordova prepare ios android --no-interactive'
      }
    }
    post {
      success {
          stash includes: 'www/**', name: 'build'
          stash includes: 'platforms/ios/**', name: 'ios'
          stash includes: 'platforms/android/**', name: 'android'
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

