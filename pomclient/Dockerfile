FROM alpine:latest as build 

RUN apk add make gcc libc-dev

WORKDIR /home/POM

COPY Makefile pomcli.c pomclient.c pomclient.h ./

RUN make all

FROM alpine:latest

WORKDIR /home/POM

COPY --from=build /home/POM/test .

COPY dev1POM.xml dev2POM.xml dev3POM.xml dev4POM.xml mock.sh ./

RUN apk add iproute2