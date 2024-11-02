import logo from './logo.svg';
import './App.css';
import InfoDisplay from './InfoDisplay';
import React from 'react';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <InfoDisplay />
      </header>
    </div>
  );
}

export default App;
