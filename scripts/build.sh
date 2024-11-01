#!/bin/sh

set -e

composer install

# If managing a codebase with multiple themes, consider looping
# over them here and running a ./build.sh script you place in
# each one.

cd  themes/custom/bootstrap_sass

npm install

gulp

cd ../../../..