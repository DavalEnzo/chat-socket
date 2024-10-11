FROM node:22-alpine

WORKDIR /front

COPY package*.json ./

RUN npm install

RUN mkdir -p node_modules/.cache && chmod -R 777 node_modules/.cache

COPY . ./

RUN npm run build

FROM httpd:latest

COPY .htaccess /usr/local/apache2/htdocs/

COPY --from=0 /front/build /usr/local/apache2/htdocs/

EXPOSE 80

CMD ["httpd-foreground"]