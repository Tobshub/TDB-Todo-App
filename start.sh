#!/bin/bash

# Start tdb in the background
tdb -u user -p pass &

# Start your npm application
npm start
