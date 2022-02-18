import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { RNPlugin, WidgetLocation } from "remnote-plugin-sdk";
import { id } from "../manifest.json";
import "./App.css";

class Plugin extends RNPlugin {
  id = id;

  async onActivate(mountDiv: HTMLElement | null, rootURL: string) {
    console.log("Plugin has been activated!");

    await this.registerWidget("widget1", WidgetLocation.QueueToolbar, {});

    // You must wait to call render in the onActivate method.
    if (!mountDiv) {
      // @ts-ignore
      mountDiv = document.getElementById("root");
    }
    ReactDOM.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
      mountDiv
    );
  }
}

const plugin = new Plugin();
plugin.run();

function App() {
  return <div style={{ backgroundColor: "lightblue" }}>I am plugin!</div>;
}

// You must export the plugin as the default export.
try {
  module.exports = plugin;
} catch (e) {}
