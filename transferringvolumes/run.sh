#!/bin/bash
docker build -t transferringvolumes:source source
docker build -t transferringvolumes:destination destination

docker volume create transfervolume

docker run --mount source=transfervolume,target=/var/volume transferringvolumes:source
sleep 1
docker run --mount source=transfervolume,target=/var/volume transferringvolumes:destination