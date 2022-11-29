import {ICurses} from "../models";
import JsImg from './JavaScript.jpg'
import JsImg2 from './Python.png'
export const curses_data: ICurses[] = [
    {
        id: 1,
        title: "JavaScript BackEnd",
        description: "JavaScript BackEnd разработка, изучение бла бла бла",
        category: "JavaScript",
        image: JsImg,
        rating: {
            rate: 3.4,
            count: 200
        }
    },
    {
        id: 2,
        title: "Python разработчик",
        description: "Python разработчик, изучение бла бла",
        category: "Python",
        image: JsImg2,
        rating: {
            rate: 4.5,
            count: 300
        }
    }
]