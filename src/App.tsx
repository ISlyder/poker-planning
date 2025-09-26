import React from 'react';
import './App.css';
import PokerPlanning from "./planning/poker-planning";
import logo from './assets/main-logo.png';
import NotFoundPage from "./ui/NotFoundPage";
import Login from "./user/login";
import {Link} from "react-router";
import {BrowserRouter, Route, Routes} from "react-router-dom";

function App() {
  return (
      <BrowserRouter>
        <div className="App flex flex-col h-screen justify-between">
          <header className="bg-primary text-white p-4 flex gap-1">
              <Link to={"/"} className={"flex items-center gap-4"}>
                  <img src={logo} className={"h-10 w-10"} alt={"Logo"}/>
                  <h1 className="text-2xl font-bold">Poker planning Infra&IOT Team</h1>
              </Link>
          </header>
            <main>
                <Routes>
                        <Route path={"/"} element={<Login />}></Route>
                        <Route path={"/room/:id"} element={<PokerPlanning />}></Route>
                        <Route path={"*"} element={<NotFoundPage />}></Route>
                    </Routes>
            </main>
            <footer className={"w-full bg-primary text-white p-4 mt-8 static bottom-0"}>
                <p>Developped By Clément</p>
            </footer>
        </div>
      </BrowserRouter>

  );
}

export default App;
