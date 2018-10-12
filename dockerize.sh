
echo "Deteniendo contenedores"
docker stop $(docker ps -a -q)
echo "Eliminado contenedores"
docker rm $(docker ps -a -q)
echo "Creado imagen"
docker rmi todaniels/smartsecurity-web-service
docker build -t todaniels/smartsecurity-web-service .
