#!/bin/sh
nginx -g 'daemon off;' &
service mysql start &
service redis-server start &
babel-node index.js
