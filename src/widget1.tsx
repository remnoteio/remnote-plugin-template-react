import { useEffect, useState } from "react";
import "./App.css";
import { RNPlugin, WidgetLocation } from "remnote-plugin-sdk";
import { id } from "../manifest.json";

import React from "react";
import ReactDOM from "react-dom";

class Plugin extends RNPlugin {
  id = id;

  // You must wait to call render in the onActivate method.
  async onActivate(mountDiv: HTMLElement | null, rootURL: string) {
    if (!mountDiv) {
      // @ts-ignore
      mountDiv = document.getElementById("root");
    }

    ReactDOM.render(
      <React.StrictMode>
        <Widget1 />
      </React.StrictMode>,
      mountDiv
    );
  }
}

const plugin = new Plugin();
plugin.run();

function Widget1() {
  return <div>Widget 1</div>;
}

// You must export the plugin as the default export.
try {
  module.exports = plugin;
} catch (e) {}
