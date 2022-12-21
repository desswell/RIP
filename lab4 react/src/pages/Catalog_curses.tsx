import React, { useState } from 'react';
import { Curses } from "../Components/curses"
import { UseCurses } from '../hooks/curses'
import { Loader } from "../Components/Loader";
import { ErrorMessage } from "../Components/ErrorMessage";
import {setButtonAction, setPriceAction, useData} from "../slices/cursesSlice";
import { ICurses } from '../models/models';
import '../style css/SearchBar.css'
import Slider from '@mui/material/Slider';
import {useDispatch} from "react-redux";

function valuetext(value: number) {
    return `${value} Rub`;
}

function Catalog_curses() {
    const {error, loading} = UseCurses()
    const data = useData()
    const dispatch = useDispatch()
    const [value1, setValue1] = useState('')
    const searchCurses = data.filter((curse: ICurses) => {
        return curse.title.toLowerCase().includes(value1.toLowerCase())
    })
    const dataPrice = searchCurses.map((curse: ICurses) => {
        return curse.price
    })
    const [value, setValue] = useState<number[]>([0, Math.max.apply(null, dataPrice)]);
    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
        dispatch( setPriceAction(value) )
    };
    return (
        <div className="container mx-auto max-w-2xl pt-5">
            <div className="box" >
                <div className="d2">
                    <input type="search" placeholder="Поиск курса"
                           onChange={(event) => {
                               setValue1(event.target.value)
                           }}
                    />
                </div>
                <Slider
                    getAriaLabel={() => 'Price range'}
                    value={ value }
                    onChange={ handleChange }
                    valueLabelDisplay="auto"
                    getAriaValueText={ valuetext }
                    max={ Math.max.apply(null, dataPrice) }
                />
                <button className="bg-yellow-200" onClick={() => {
                    dispatch(setButtonAction())
                }}>
                    Фильтровать
                </button>
            </div>
            { error && <ErrorMessage error={error}/> }
            { loading && <Loader/> }
            { searchCurses.map((curse: ICurses) => <Curses curse = {curse} key={curse.id} />) }
        </div>
    );
}

export default Catalog_curses;
