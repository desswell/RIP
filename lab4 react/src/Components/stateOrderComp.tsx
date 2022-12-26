import React, {useEffect, useState} from "react";
import {Autocomplete, TextField} from "@mui/material";

export function SOC ({props}: any) {
    const options = ['Начат', 'Закончен', "Отменен"];
    const [clickted, setClicked] = useState(false)
    const [value, setValue] = useState<string | null>(props.status);
    useEffect(() => {
        fetch('api/Purchase/changeStatus/',{method : "PUT", body: JSON.stringify({"id_curse": props.id_curse, "id_user": props.id_user, "status": value})})
            .then((res) => res.json())
            .then((data) => {
                if(JSON.parse(data)["status"] === "ok"){
                    console.log("success")
                }
            });
    }, [clickted])
    const HandleClick = () => {
        fetch('api/Purchase/delete/',{method : "DELETE", body: JSON.stringify({"id_curse": props.id_curse, "id_user": props.id_user})})
            .then((res) => res.json())
            .then((data) => {
                if(JSON.parse(data)["status"] === "ok"){
                    console.log("deleted")
                }
            });
        setClicked((prev) => !prev)
        window.location.reload()
    }
    return (
    <div
        className="border py-2 px-4 rounded flex flex-col items-center mb-2"
    >
        <div  className="rounded flex flex-col items-center mb-2"
        >
            <p className="py-2 text-2xl">id Пользователя - {props.id_user} </p>
            <p className="py-2 text-2xl">id Курса - {props.id_curse} </p>
            <p className="py-2 text-2xl">Сумма - {props.sum} рублей</p>
            <p className="py-2 text-2xl">Дата покупки - {props.date_purchase} </p>
            {props.status !== "Куплен" && <Autocomplete
                value={value}
                onChange={(event: any, newValue: string | null) => {
                    setValue(newValue);
                }}
                id="controllable-states-demo"
                options={options}
                sx={{width: 300}}
                renderInput={(params) => <TextField {...params} label="Статус"/>}
            />}
            {props.status === "Куплен" && <div>Статус: Куплен, поэтому вы можете только удалить</div>}
            <p className="py-2 text-2xl">Дата изменения статуса: {props.date_status} </p>
            <button className="bg-red-600 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
            onClick={HandleClick}>
                Удалить
            </button>
        </div>
    </div>
    )
}