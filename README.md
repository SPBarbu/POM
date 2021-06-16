How to use:

1. From within the POM repository, run "docker-compose up".
2. Run "docker attach [name of pomclient container]".

To stop: With another terminal, from within the POM repository, run "docker-compose stop".

To start back again after stopping: From within the POM repository, run "docker-compose start".

To start when modifications have been made to the docker files, or the application's files: From within the POM repository, run "docker-compose up --build"
