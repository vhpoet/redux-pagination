#!/bin/sh

# build minified standalone version in dist
rm -rf dist
./node_modules/.bin/webpack --output-filename=dist/redux-pagination.js
./node_modules/.bin/webpack --output-filename=dist/redux-pagination.min.js --optimize-minimize

# build ES5 modules to lib
rm -rf lib
./node_modules/.bin/babel src --out-dir lib