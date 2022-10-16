FROM node:14.19.3-slim

WORKDIR /usr/src/app

COPY package-lock.json package.json ./

RUN npm ci --only=prod


COPY tsconfig-path.bootstrap.js tsconfig.json ./

COPY ./dist/ ./dist

EXPOSE 3000 

CMD [ "npm", "start" ]
