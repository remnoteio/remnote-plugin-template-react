import { useState } from 'react'
import logo from './logo.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

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
          <button>Show Toast</button>
        </p>
    </div>
  )
}

export default App
