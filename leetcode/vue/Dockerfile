FROM i.harbor.dragonest.net/public/node:9.5-alpine
MAINTAINER jackeili
ARG ENV
ARG ACCESSKEYID
ARG ACCESSKEYSECRET
ARG BUCKET
ARG REGION
ENV HOST 0.0.0.0
WORKDIR /app
COPY . /app
RUN npm --registry http://172.16.52.62:8081/repository/ly_npm_all/ install
RUN npm --registry http://172.16.52.62:8081/repository/ly_npm_all/ run build:${ENV}
#RUN npm --registry  https://registry.npmjs.org/ install
#RUN npm --registry  https://registry.npmjs.org/ run build:${ENV}
#RUN npm install
#RUN npm run build:${ENV}
ENV NODE_ENV=production
ENTRYPOINT ["node","server/index.js"]
