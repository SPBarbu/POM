FROM ubuntu:20.04

RUN apt-get -yqq update

RUN apt-get -yqq install cmake

RUN apt-get -yqq install iproute2

WORKDIR /home/POM/

ADD . .

RUN make