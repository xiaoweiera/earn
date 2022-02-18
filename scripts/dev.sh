#!/bin/bash

cd "$(dirname "$0")"

cd ..

ts-node --project tsconfig.serve.json src/server/start --mode development

