import React from 'react';
import {Curses} from "../Components/curses"
import {UseCurses} from '../hooks/curses'
import {Loader} from "../Components/Loader";
import {ErrorMessage} from "../Components/ErrorMessage";

function Catalog_curses() {
    const {curses, error, loading} = UseCurses()
    return (
        <div className="container mx-auto max-w-2xl pt-5">
            { error && <ErrorMessage error={error}/> }
            { loading && <Loader/> }
            { curses.map(curse => <Curses curse = {curse} key={curse.id} />) }
        </div>
    );
}

export default Catalog_curses;
