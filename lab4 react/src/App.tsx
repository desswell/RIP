import React from 'react';
import {Curses} from './Components/curses'
import {curses_data} from "./data/curses";

function App() {
  return (
  <div className="container mx-auto max-w-2xl pt-5">
    <Curses curses = {curses_data[0]}/>
  </div>
  );
}

export default App;
