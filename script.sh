#! /usr/local/bin/zsh
grasp -jH 'var-dec' src/*.js src/**/*.js > temp.json
node script.js
rm temp.json