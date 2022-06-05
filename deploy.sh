#!/usr/bin/env bash

rm package-lock.json
git add .
git commit -sm 'Remove package-lock.json'
git push -f heroku main
git reset --hard HEAD~