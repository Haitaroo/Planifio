#!/bin/bash

# Build the project
npm run build

# Navigate into the build output directory
cd dist

# If you're using a custom domain
# echo 'www.example.com' > CNAME

# Initialize a new Git repository
git init

# Add all files to the new repository
git add -A

# Commit the changes
git commit -m 'Deploy to GitHub Pages'

# Push to the gh-pages branch
git push -f git@github.com:<USERNAME>/<REPO>.git main:gh-pages

cd -