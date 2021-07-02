How to use:

1. From within the POM repository, run "docker-compose up".
2. Run "docker attach [name of pomclient container]".

To stop: With another terminal, from within the POM repository, run "docker-compose stop".

To start back again after stopping: From within the POM repository, run "docker-compose start".

To start when modifications have been made to the docker files, or the application's files: From within the POM repository, run "docker-compose up --build"

To run Pumba:

With a new terminal, run "docker run -it --rm -v /var/run/docker.sock:/var/run/docker.sock gaiaadm/pumba [command]", where [command] is the Pumba command to run as seen on https://github.com/alexei-led/pumba/.