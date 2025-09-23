import React from 'react';
import './App.css';
import PokerPlanning from "./vote/poker-planning";
import logo from './assets/main-logo.png';

function App() {
  return (
    <div className="App flex flex-col h-screen justify-between">
      <header className="bg-primary text-white p-4 flex gap-1">
          <img src={logo} className={"h-10 w-10"} alt={"Logo"}/>
        <h1 className="text-2xl font-bold">Poker planning Infra&IOT Team</h1>
      </header>
        <main className="mb-auto">
            <PokerPlanning />
        </main>
        <footer className={"w-full bg-primary text-white p-4 mt-8 static bottom-0"}>
            <p>Developped By Clément</p>
        </footer>
    </div>
  );
}

export default App;
