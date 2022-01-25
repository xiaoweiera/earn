#!/bin/bash

cd "$(dirname "$0")"

cd ..

lang=$1

if [ ! $lang ]; then
  lang="en"
fi

printf "build ${lang}\n"

printf "client\n"
vite build --mode $lang --outDir dist/client/$lang --ssrManifest

printf "server\n"
vite build --mode $lang --ssr src/entry-server.ts --outDir dist/server/$lang
