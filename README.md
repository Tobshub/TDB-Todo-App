# TDB Example App

This is a simple to-do app, that allows you to add a to-do item and delete it when done. 
It serves to showcase, on an elementary level, the functionality of some technologies I've built.

## Quickstart
Pull the image:
```bash
$ docker pull tobani/tdb-example-app
```
Run a container from the image:
```bash
$ docker run -d -p 4000:4000 tobani/tdb-example-app
```
If you want to persist the data after the container has been destroyed, or you just want to use a file on your machine to persist that data:
```bash
$ docker run -d -v path/to/db.tdb:/app/db.tdb -p 4000:4000 tobani/tdb-example-app
```

## Technologies

### TobsDB
The example app uses [TobsDB](https://github.com/tobshub/tobsdb), a database server built in golang, to persist data. The app server uses [tobsdb](https://www.npmjs.com/package/tobsdb) npm package, a nodejs client for interacting with a TobsDB server, to make CRUD requests to the database.

### Tobspress
The server uses [tobspress](https://npmjs.com/packages/@tobshub/tobspress), a nodejs library for easily building REST APIs, to send CRUD requests (using [tobsdb](https://www.npmjs.com/package/tobsdb)) to the TobsDB server, as well as render the web page.

The frontend uses **only** html and JS, because **anything** more is overkill - in this case.
