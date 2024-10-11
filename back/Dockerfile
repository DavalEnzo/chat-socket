FROM node:22-alpine

WORKDIR /app

COPY package*.json /app/

RUN npm install

RUN mkdir -p node_modules/.cache && chmod -R 777 node_modules/.cache

COPY . /app/

EXPOSE 4000

CMD ["node", "server.js"]

