#! /usr/local/bin/zsh
grasp -j 'var-dec' src/*.js > temp.json
node script.js
rm temp.json