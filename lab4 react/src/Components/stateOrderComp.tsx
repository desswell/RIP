import {ChangeAuthAction, DelOrderAction} from "../slices/shoppingCartSlice";
import React, {useEffect, useState} from "react";
import {Autocomplete, TextField} from "@mui/material";

export function SOC ({props}: any) {
    const options = ['Куплен', 'Начат', 'Закончен', "Отменен"];
    const [value, setValue] = useState<string | null>(props.status);
    useEffect(() => {
        fetch('api/Purchase/changeStatus/',{method : "PUT", body: JSON.stringify({"id_curse": props.id_curse, "id_user": props.id_user, "status": value})})
            .then((res) => res.json())
            .then((data) => {
                if(JSON.parse(data)["status"] === "ok"){
                    console.log("success")
                }
            });
    }, [value])
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
            <Autocomplete
                value={value}
                onChange={(event: any, newValue: string | null) => {
                    setValue(newValue);
                }}
                id="controllable-states-demo"
                options={options}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Статус" />}
            />
            <p className="py-2 text-2xl">Дата изменения статуса: {props.date_status} </p>
        </div>
    </div>
    )
}