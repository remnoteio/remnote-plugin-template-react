import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { RNPlugin } from 'remnote-plugin-sdk';
import { id } from '../manifest.json';


class Plugin extends RNPlugin {
  id = id;

  async onActivate() {
    this.registerCommand({
      id: `${this.id}.reminder`,
      label: 'Remind me in 25min',
      action: () => {
        setTimeout(() => this.toast('Reminder is up!'), 2000);
      },
    });

    this.registerWidget('pomodoro', 'QueueToolbar', {});
  }
}

const plugin = new Plugin();
plugin.run();

function App() {
  const [count, setCount] = useState(0);

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
          console.log("AAAAAAAAAAAAAAAA");
          plugin.toast('Hello World!')
        }}>Show Toast</button>
      </p>
    </div>
  );
}

export default App;
