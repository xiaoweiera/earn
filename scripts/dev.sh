#!/bin/bash

cd "$(dirname "$0")"

cd ..

lang=$1

if [ ! $lang ]; then
  lang="en"
fi

ts-node --project tsconfig.serve.json src/server/start --mode development --lang $lang
