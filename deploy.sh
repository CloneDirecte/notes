#!/usr/bin/env sh

# abort on errors
set -e

# remove current build
rm -rf dist

# build
npm run build

# navigate into the build output directory
cd dist

# if you are deploying to a custom domain
echo 'notes.clonedirecte.cf' > CNAME

git init
git checkout -b gh-pages
git add -A
git commit -m 'chore: deploy'

# if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git main

# if you are deploying to https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:CloneDirecte/notes.git gh-pages

cd -
