#!/bin/bash

cd "$(dirname "$0")"

cd ..

lang=$1

ts-node --project tsconfig.serve.json src/server/start --mode development
