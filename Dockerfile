FROM node:latest
RUN mkdir /src

#Se creo un archivo adicional nodemon. json dentro de la carpeta de la aplicacion
#RUN npm install nodemon -g

WORKDIR /src
#ADD smartsecurity-web-service/package.json /src/package.json
#ADD smartsecurity-web-service/ /src/
#RUN npm install

COPY . /src

EXPOSE 4005
RUN npm install
CMD npm start

#docker run -p 4005:4005 --env="MYSQL_HOST=192.168.191.134" --env="MYSQL_DB=smartsdksecurity" --env="MYSQL_USER=root" --env="MYSQL_PASSWORD=root"  --env="CRATEDB=http://35.196.174.137:4200" --env="ORION=http://35.196.174.137:1026/v2"  todaniels/smartsecurity-web-service
