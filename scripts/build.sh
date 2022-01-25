#!/bin/bash

printf "build en\n"

printf "client\n"
vite build --mode en --outDir dist/client/en --ssrManifest

printf "server\n"
vite build --mode en --ssr src/entry-server.ts --outDir dist/server/en


printf "build cn\n"

printf "client\n"
vite build --mode cn --outDir dist/client/cn --ssrManifest

printf "server\n"
vite build --mode cn --ssr src/entry-server.ts --outDir dist/server/cn
