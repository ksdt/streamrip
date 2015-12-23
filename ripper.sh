#!/bin/bash
SHOWNAME="$(python show.py)"
TIME="$(date +%F)"

#if the showname is not found (e.g. satan)
if [ "$SHOWNAME" -eq "-1" ] 
then
    SHOWNAME="SATAN $(date +%T)"
fi

FILENAME="$SHOWNAME $TIME.mp3"

echo "Recording to $FILENAME"

ficy -o "$FILENAME" -M 60m -d ksdt.ucsd.edu:8000/stream

echo "Uploading to cloud storage..."

node b2.js "$FILENAME"
