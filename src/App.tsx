import React from 'react';
import './App.css';
import PokerPlanning from "./planning/PokerPlanning";
import NotFoundPage from "./ui/NotFoundPage";
import Login from "./user/Login";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import CreateRoom from "./room/CreateRoom";
import Header from "./ui/Header";

function App() {
  return (
      <BrowserRouter>
          <Header />
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
