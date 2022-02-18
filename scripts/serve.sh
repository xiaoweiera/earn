#!/bin/bash

cd "$(dirname "$0")"

source ./args.sh

cd ..

ts-node --project tsconfig.serve.json src/server/start --mode $mode --port $port
