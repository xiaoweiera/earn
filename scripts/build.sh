#!/bin/bash

cd "$(dirname "$0")"

source ./args.sh

cd ..

printf "build\n"

printf "client\n"
vite build --mode $mode --outDir dist/client --ssrManifest

printf "server\n"
vite build --mode $mode --ssr src/entry-server.ts --outDir dist/server
