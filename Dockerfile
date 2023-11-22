FROM node:latest
COPY . /app
COPY package.json ./
WORKDIR /app

RUN npm install

CMD [ "npm","start"]