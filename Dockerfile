FROM node:latest
RUN mkdir /src
# Change the work directory
WORKDIR /src
# Copy the source code into 
COPY . /src
# Expose the port
EXPOSE 4005
# Run commands to install dependencies
RUN npm install
# Command to star the server
CMD npm start
#Command to start the container 
#docker run -p 4005:4005 --env="MYSQL_HOST=192.168.191.134" --env="MYSQL_DB=smartsdksecurity" --env="MYSQL_USER=root" --env="MYSQL_PASSWORD=root"  --env="CRATEDB=http://35.196.174.137:4200" --env="ORION=http://35.196.174.137:1026/v2"  todaniels/smartsecurity-web-service
