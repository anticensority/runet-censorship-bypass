#!/bin/sh -e
base=$(dirname "$0")
dest="$base/_generated"
mkdir -p $dest
npm start --silent > $dest/index.html
