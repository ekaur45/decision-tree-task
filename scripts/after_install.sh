#!/bin/bash

mkdir /home/ubuntu/decisiontree
cd /home/ubuntu/decisiontree

cd build
sudo npm install
#cp .env.local .env
pm2 start server/index.js --name decisiontree
pm2 stop decisiontree
pm2 start decisiontree
