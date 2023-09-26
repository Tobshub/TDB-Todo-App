#!/bin/bash

# Start tdb in the background
tdb -schema=/app/tdb/schema.tdb &

# Start your npm application
npm start
