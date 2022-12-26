import React, {useEffect, useState} from "react";
import {Link, useHistory, useParams} from 'react-router-dom'
import { UseCurse } from "../hooks/IDCurses";
import { useDispatch } from "react-redux";
import {AddOrderAction, useIsAuth, useUserId} from "../slices/shoppingCartSlice";
import {BoughtCurses} from "../hooks/boughtCurses";
import {GetUser} from "../hooks/GetUser";
import Modal from "../Components/Modal"
import "../style css/LogIn.css"
const CurseId = () => {
    const params = useParams()
    GetUser()
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState('')
    const { curse } = UseCurse(params.id)
    const [modalActive, setModalActive] = useState(false)
    const dispatch = useDispatch()
    const Auth = localStorage.getItem('login')
    const isAuth = Auth !== null
    const history = useHistory()
    const is_superUser = useUserId()
    const {flag, data} = BoughtCurses()
    const [bought, SetBought] = useState(false)
    const [onHover, setOnHover] = useState(true)
    const Hover = onHover ? 'Уже в корзине' : 'Перейти в корзину'
    const HandleClickDelete = () => {
        fetch('/api/curses/delete/', {method: "DELETE", body: JSON.stringify({"id_curse": params.id})})
            .then(response => {
                response.json()
            })
        setModalActive(false)
        history.push("/curses")
    }
    const HandleClickChange = () => {
        fetch('/api/curses/change/', {method: "PUT", body: JSON.stringify({"id": params.id, "title": title, "price": price, "description": description})})
            .then(response => response.json())
            .then(data => {
                if (JSON.parse(data)["status"] === "ok") {
                    setModalActive(false)
                }
            })
    }
    const status = "Начат"
    const user_id = useUserId()
    const HandleClickStatus = () => {
        fetch('/api/Purchase/changeStatus/',{method : "PUT", body: JSON.stringify({"id_curse": params.id, "id_user": user_id, "status": status})})
            .then((res) => res.json())
            .then((data) => {
                if(JSON.parse(data)["status"] === "ok"){
                    console.log("success")
                    window.location.reload()
                }
            });
    }
    return(
        <div className="flex-1">
            <p className=" text-1xl text-lg">Страница курса {curse.title} </p>
            <img src={curse.image} className="w-1/4"></img>
            <p className="text-2xl align-text-top">Цена курса {curse.price} rub</p>
            {!bought && isAuth && !flag && <button
                className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                onClick={() => {
                    dispatch(AddOrderAction(curse))
                    SetBought(!bought)
                }
                }
            >
                Приобрести
            </button>}
            {bought && <Link to="/ShCart">
                <button
                className="bg-green-700 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                onMouseEnter={
                () => setOnHover(prev => !prev)
            }
                onMouseLeave={
                    () => setOnHover(prev => !prev)
            }
            >
                {Hover}
            </button>
            </Link>}
            {!isAuth && <div className="text-2xl align-middle">
                <Link to="/SighIn">Сначала войдите</Link>
            </div>}
            {flag && data === "Куплен" && <div className="text-2xl">
                <button className="buttonStyleUpload" onClick={HandleClickStatus}>
                    Начать просмотр курсов
                </button>
            </div>}
            {flag && data === "Начат" && <div className="text-2xl">Вы начали курс</div>}
            {is_superUser === 1 && <button className="border-y-amber-300 border text-2xl" onClick={() => setModalActive(true)}>
                Изменить
            </button>}
            <Modal active={modalActive} setActive={setModalActive}>
                <form action="">
                    <input onChange={(event) => setTitle(event.target.value)}
                        type="text" className='InputField' placeholder={curse.title}>
                    </input>
                    <input onChange={(event) => setPrice(event.target.value)}
                        type="text" className='InputField' placeholder={curse.price}></input>
                    <input  onChange={(event) => setDescription(event.target.value)}
                        type="text" className='InputField' placeholder={curse.description}></input>
                    <button className="buttonStyle" onClick={HandleClickChange}>
                        Изменить
                    </button>
                    <br/>
                    <button onClick={HandleClickDelete}
                            className="buttonStyleDel">
                        Удалить
                    </button>
                </form>
            </Modal>

        </div>
    );
}

export default CurseId;