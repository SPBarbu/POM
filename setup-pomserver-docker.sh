#run from within the repository at https://github.com/SPBarbu/POM

#build the pomserver image
docker build -t pomserver -f pomserver/Dockerfile .

#create a network
docker network create pom-net

#create a persistent storage
# docker volume create pomserver-vol

#run the pomserver container
docker run -d --name pomserver --net pom-net -p 8000:8000 pomserver
# docker run -d --name pomserver --net pom-net -p 8000:8000 -v pomserver-vol:/home pomserver

#run to start container and attach console
#docker start -ia pomserver

#run to attach to running container
#docker attach pomserver