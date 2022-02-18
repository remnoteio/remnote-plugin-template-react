# Template for React-based RemNote Plugins

## Usage

**Prerequisites**: You need to have `git` and `node` installed and some basic understanding of React.

1. Create a new repo based on this template.
2. Change the `id` in `manifest.json`.
3. Install dependencies with `npm install`.
4. Start plugin development server with `npm run dev` for sandbox mode.

# Local testing

## Sandbox mode

Run `npm run dev`

## Native mode

1. Run `npx serve -l 3002 --cors` and keep the server running to serve the assets built every time you run `npm build`.
2. Run `npm build` EVERY TIME YOU MAKE A CHANGE (we need something better here still)

# Adding new widgets:

To add a widget with name `widget2`:

1. Create `widget2.js` in the `src` folder
   Copy the existing `widget1.js` as an example.
2. Create `widget2.html` in the `root` folder.
   Copy the existing `widget1.html` as an example.
3. Register this `widget2` in `vite.config.ts`. This is a single new line you need to add.
