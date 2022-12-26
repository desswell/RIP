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
import Modal from "../Components/Modal";
import '../style css/LogIn.css'

function valuetext(value: number) {
    return `${value} Rub`;
}

function Catalog_curses() {
    const {error, loading} = UseCurses()
    const isSuperUser = localStorage.getItem('login') === "admin"
    const data = useData()
    const [modalActive, setModalActive] = useState(false)
    const dispatch = useDispatch()
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState("0")
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
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

    const HandleChangeUpload = () => {
        fetch('/api/curses/upload/', {method: "POST", body: JSON.stringify({"title": title, "price": price, "description": description, "image": image})})
            .then(response => response.json())
            .then(data => {
                if (JSON.parse(data)["status"] === "ok") {
                    setModalActive(false)
                }
            })
    }
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
                <br/>
                <Modal active={modalActive} setActive={setModalActive}>
                    <form action="">
                        <input onChange={(event) => setTitle(event.target.value)}
                               type="text" className='InputField' placeholder="Название"></input>
                        <input onChange={(event) => setPrice(event.target.value)}
                               type="text" className='InputField' placeholder="Цена"></input>
                        <input onChange={(event) => setDescription(event.target.value)}
                               type="text" className='InputField' placeholder="Описание"></input>
                        <div className="m-3">
                            <label className="mx-3">Выберите изображение </label>
                            <input className="d-none" type="file" onChange={(event) => {setImage(event.target.value)}} />
                        </div>
                        <button className="buttonStyleUpload" onClick={HandleChangeUpload}>
                            Добавить
                        </button>
                    </form>
                </Modal>
                {isSuperUser && <button className="bg-yellow-200" onClick={() => {
                    setModalActive(true)
                }
                }> Добавить </button>}
            </div>
            { error && <ErrorMessage error={error}/> }
            { loading && <Loader/> }
            { searchCurses.map((curse: ICurses) => <Curses curse = {curse} key={curse.id} />) }
        </div>
    );
}

export default Catalog_curses;
