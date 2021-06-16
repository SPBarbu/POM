#run from within the repository at https://github.com/SPBarbu/POM

#build the pomclient image
docker build -t pomclient -f pomclient/Dockerfile .

#run the pomclient container
docker run -dit --rm --net pom-net pomclient

#run to start container and attach console
#docker start -ia [NAME_OF_CONTAINER]

#run to attach to running container
#docker attach [NAME_OF_CONTAINER]