import React from 'react';
import {Curses} from "../Components/curses"
import {curses_data} from "../data/curses"
function Catalog_curses() {
    return (
        <div className="container mx-auto max-w-2xl pt-5">
            {curses_data.map(curses => <Curses curses = {curses} key={curses.id} />)}
        </div>
    );
}

export default Catalog_curses;
