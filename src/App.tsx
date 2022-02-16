import { useState } from 'react';
import './App.css';
import { RNPlugin } from 'remnote-plugin-sdk';
import { id } from '../manifest.json';


class Plugin extends RNPlugin {
  id = id;

  async onActivate() {
    this.registerCommand({
      id: `${this.id}.reminder`,
      name: 'Remind me in 25min',
      action: () => {
        setTimeout(() => this.toast('Reminder is up!'), 2000);
      },
    });
  }
}

const plugin = new Plugin();
plugin.run();

function App() {
  const [colorIndex, setColorIndex] = useState(0);
  const colors = ['red', 'green', 'blue'];

  return (
    <div className="plugin">
      <p>RemNote Plugin</p>
      <p>
        <a
          className="link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        {' | '}
        <a
          className="link"
          href="https://remnote.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          RemNote Plugin Docs
        </a>
      </p>
      <p>
        <button onClick={() => {
          plugin.toast('Hello World!')
        }}>Show Toast</button>
        <button onClick={() => {
          const color = colors[colorIndex];
          setColorIndex((colorIndex + 1) % colors.length);
          plugin.registerCSS('background', `.rem-text { color: ${color};`)
        }}>Add CSS</button>
      </p>
    </div>
  );
}

export default App;
