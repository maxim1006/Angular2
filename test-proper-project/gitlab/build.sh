#!/bin/sh
npm config set registry #add registry here

#find / -type d -name "node_modules" -print

npm cache clean
echo "Current path:"
pwd

echo "Finding package-lock:"
find / -type d -name "package-lock" -print


npm --prefix ./ install
#npm --prefix ./ install gulp
#npm --prefix ./ install gulp-load-plugins
#npm --prefix ./ install browser-sync
#npm --prefix ./ install webpack
#npm --prefix ./ install gulp-plumber
#npm --prefix ./ install gulp-clean
#npm --prefix ./ install html-webpack-plugin
#npm --prefix ./ install on-build-webpack
#npm --prefix ./ install copy-webpack-plugin
#npm --prefix ./ install @ngtools/webpack
#npm --prefix ./ install @angular/compiler-cli

echo "Current folder"
ls

echo "ls node_modules"
ls node_modules

echo "find node_modules"
find / -type d -name "node_modules" -print

echo "global node_modules"
ls /usr/local/lib/node_modules
echo "npm folder"
ls /usr/local/lib/node_modules/npm
echo "bin folder"
ls /usr/local/lib/node_modules/npm/bin

echo "root:"

npm root

echo "AND GLOBAL"

npm root -g

#ln -s gulp ./node_modules/.bin/gulp
npm run prod
