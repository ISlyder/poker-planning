import React from 'react';
import './App.css';
import PokerPlanning from "./planning/poker-planning";
import logo from './assets/main-logo.png';
import NotFoundPage from "./ui/NotFoundPage";
import Login from "./user/login";
import {Link} from "react-router";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import CreateRoom from "./room/create-room";

function App() {
  return (
      <BrowserRouter>
          <header className="bg-primary text-white p-4 flex gap-1">
              <Link to={"/"} className={"flex items-center gap-4"}>
                  <img src={logo} className={"h-10 w-10"} alt={"Logo"}/>
                  <h1 className="text-2xl font-bold">Poker planning Infra&IOT Team</h1>
              </Link>
          </header>
            <>
                <Routes>
                    <Route path={"/"} element={<CreateRoom />} />
                    <Route path={"room/:id/login"} element={<Login />} />
                    <Route path={"/room/:id"} element={<PokerPlanning />} />
                    <Route path={"*"} element={<NotFoundPage />} />
                </Routes>
            </>
            <footer className={"w-full bg-primary text-white p-4 static"}>
                <p>Developped By Clément</p>
            </footer>
      </BrowserRouter>

  );
}

export default App;
