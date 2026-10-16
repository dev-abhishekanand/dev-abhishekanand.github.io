#!/usr/bin/env bash
# Abhishek Anand Portfolio Deployment Script for GitHub Pages
set -e

echo "============================================="
echo " Deploying Portfolio to dev-abhishekanand.github.io"
echo "============================================="

# Ensure git is initialized
if [ ! -d ".git" ]; then
  git init
  git branch -M main
fi

# Add current files
git add index.html style.css script.js README.md
git commit -m "feat: launch modern GitHub Pages portfolio" || echo "Nothing to commit"

# Check if remote exists
if ! git remote | grep -q "origin"; then
  echo "Adding remote origin for dev-abhishekanand.github.io..."
  git remote add origin https://github.com/dev-abhishekanand/dev-abhishekanand.github.io.git
fi

echo ""
echo "To push your website live to GitHub Pages, run:"
echo "  git push -u origin main"
echo ""
echo "Your portfolio will be live at: https://dev-abhishekanand.github.io"
