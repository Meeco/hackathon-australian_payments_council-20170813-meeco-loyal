FROM node:6

RUN npm install -g cordova@latest ionic@latest && cordova telemetry off
