FROM i.harbor.dragonest.net/public/node:12.9.1 as staticize
COPY . /app
WORKDIR /app
ARG ACCESSKEYID
ARG ACCESSKEYSECRET
ARG BUCKET
ARG REGION
RUN npm --registry http://172.16.52.62:8081/repository/ly_npm_all/ install
#RUN npm  install
RUN npm run build:xxxx
RUN ls -l /app/dist/
 
FROM i.harbor.dragonest.net/public/nginx:alpine-docker
COPY --from=staticize /app/dist /wwwroot/dist
RUN ls -l /wwwroot/dist
ENTRYPOINT ["nginx"]
