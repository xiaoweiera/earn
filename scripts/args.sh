#!/bin/bash

mode=$1
port=$2

if [ ! $port ]; then
  port="3333"
fi

if [ ! $mode ]; then
  mode="production"
fi
