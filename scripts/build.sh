#!/bin/bash

cd "$(dirname "$0")"

cd ..


printf "build\n"

printf "client\n"
vite build --mode production --outDir dist/client --ssrManifest

printf "server\n"
vite build --mode production --ssr src/entry-server.ts --outDir dist/server
