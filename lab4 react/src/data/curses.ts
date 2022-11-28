import {ICurses} from "../models";
import JsImg from './JavaScript.jpg'

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
    }
]