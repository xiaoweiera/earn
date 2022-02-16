#!/bin/bash

cd "$(dirname "$0")"

cd ..

port=$1

if [ ! $port ]; then
  port="3333"
fi

ts-node --project tsconfig.serve.json src/server/start --mode production --port $port
