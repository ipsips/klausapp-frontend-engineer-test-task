import React from "react";
import ReactDOM from "react-dom";
// @ts-ignore
import { App } from "./ui/App.tsx";

const users = (window as any).__STATE__;

ReactDOM.hydrate(<App users={users} />, document.getElementById("root"));
