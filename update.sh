#!/usr/bin/zsh
npm run build
rm -rf ../stocklogserver/public/*
cp -r ./build/* ../stocklogserver/public/

