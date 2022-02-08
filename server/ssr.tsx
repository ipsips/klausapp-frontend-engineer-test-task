import React from "react";
import ReactDOMServer from "react-dom/server";
import serialize from "serialize-javascript";
import { User } from "model/User.ts";
import { App } from "client/src/ui/App.tsx";

export const renderToString = (users: User[]) => {
  const body = ReactDOMServer.renderToString(<App users={users} />);
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/static/main.css" />
    <title>Klausapp test task</title>
  </head>
  <body >
    <div id="root">${body}</div>
    <script src="/static/main.js" defer></script>
    <script>window.__STATE__ = ${serialize(users, { isJSON: true })}</script>
  </body>
</html>`;
};
