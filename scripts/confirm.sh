#!/usr/bin/env bash

if [ "$1" != "-q" ]
then

    read -p "Are you sure? " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]
    then
        exit 1
    fi
fi
