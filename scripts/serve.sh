#!/bin/bash

cd "$(dirname "$0")"

cd ..

lang=$1
port=$2

if [ ! $lang ]; then
  lang="en"
fi

if [ ! $port ]; then
  port="3333"
fi

ts-node --project tsconfig.serve.json src/server/start --mode production --lang $lang --port $port
