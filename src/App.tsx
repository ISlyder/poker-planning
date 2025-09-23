import React from 'react';
import './App.css';
import PokerPlanning from "./vote/poker-planning";

function App() {
  return (
    <div className="App">
      <header className="bg-primary text-white p-4">
        <h1 className="text-2xl font-bold">🃏 Poker planning</h1>
      </header>
       <PokerPlanning />
    </div>
  );
}

export default App;
