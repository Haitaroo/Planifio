#!/bin/bash

# Build the project
npm run build

# Navigate into the build output directory
cd dist

# Initialize a new Git repository
git init

# Add all files to the new repository
git add -A

# Commit the changes
git commit -m 'Deploy to GitHub Pages'

# Push to the gh-pages branch using HTTPS
git push -f https://github.com/Haitaroo/Planifio.git main:gh-pages

cd -
