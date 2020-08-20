import React from 'react';
import './App.css';

import Authentication from './components/authenticator';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Authentication />
      </header>
    </div>
  );
};

export default App;
