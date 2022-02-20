# Klausapp Frontend Engineer Test Task

> Online demo may be tried at: https://klausapp-test-task.deno.dev/

I've been wanting to try out [Deno.js](https://deno.land/) for a while now, and it seemed like it would be a good fit for this test task. Deno aims to provide the [same Web API interfaces](https://deno.com/blog/every-web-api-in-deno) in its runtime that browsers provide, so it should be relatively painless to write isomorphic webapps with Deno on the server-side.

Client is written in React.js and app state is also managed with React. I decided not to write a separate state machine (with Redux, MobX or similar) for it just didn't seem like a pressing requirement for such a simple app as this.

Even though Deno ships with its own javascript bundler, I could not leverage it for bundling this app's client because `react-bootstrap` which I really wanted to use as component library was not available as Deno dependency. npm dependencies and Webpack came to rescue. 

App is complete with persistent storage in [Cloud Firestore](https://firebase.google.com/products/firestore/).

## To run and develop locally:

Install [Deno.js](https://deno.land/#installation) and [Node.js](https://nodejs.org/en/)

### Client

Install dependencies, then bundle client (and watch for changes):
```shell
cd client
npm install
npm start
```

### Server

Server depends on a [Google Cloud Firestore](https://firebase.google.com/products/firestore/) instance. [Read here](FIREBASE_SETUP.md) on how to set up one. Once you've done that, follow these steps:

1. Create `.env` file in project root and put your firebase app credentials in it.
```
FIREBASE_CONFIG='{"apiKey":"...","authDomain":"...","projectId":"...","storageBucket":"...","messagingSenderId":"...","appId":"..."}'
FIREBASE_USERNAME="..."
FIREBASE_PASSWORD="..."
```

2. Start server:
```shell
env $(cat .env | xargs) deno run --allow-net --allow-read --allow-env --no-check app.ts
```
Read more about [Deno CLI documentation](https://deno.land/manual@v1.11.3/getting_started/command_line_interface#command-line-interface).

> **Once client is bundled and server is up, open a browser window and point it to [http://localhost:8000/](http://localhost:8000/)**