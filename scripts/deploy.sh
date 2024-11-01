#!/bin/sh

set -e

#TODO: Check if we are on a branch or tag and handle separately
acli push:artifact --destination-git-branch=develop-build