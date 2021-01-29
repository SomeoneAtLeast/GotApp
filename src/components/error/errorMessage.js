import React from "react";
import "./errorMessage.css"
import img from "./error.webp"
const ErrorMessage = () => {
    // для получения данных из папки паблик нужно прописать process.evn.PUBLIC_URL + адрес\
    // <img src={process.env.PUBLIC_URL + `/img/error.webp`} alt="error"></img>
    return (
        <>
            <img src={img} alt="error"></img>
            <span>Что-то сломалось ЗАЧЕМ</span>
        </>
    )
}
export default ErrorMessage;