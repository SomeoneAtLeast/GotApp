import React, {Component} from 'react';
import './randomChar.css';
import gotService from '../../services/gotService.js';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

export default class RandomChar extends Component {

    //this.updateChar(); будет вызван сразу после создания экземпляра
    constructor() {
        super();
        this.updateChar();
    }
    // вероятно по новому синтаксису для стейта не нужен конструктор
    gotService = new gotService();
    // loading - это состояние загрузки данных с сервера для отображения заглушки
    // - ошибки при получении данных
    state = {
        char: {},
        loading: true,
        error: false
    }

    //задает стейт
    // стрелка имеет контекстр родиля - этот экземпляр
    // поэтмоу не надо биндить
    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false // сбрасывает анимацию загрузки
        })
    }
    // именно стрелочная функция избавляет от проблем с контекстом
    // и позволяет не биндить
    onError = (err) => {
        this.setState({
            error: true,
            loading: false
        })
    }

    updateChar() {
        // const id = Math.floor(Math.random()*140 + 25); //25-140
        const id = 15000;
        //Тут возвращается промис
        // в then мы что-то с ним делаем
        // char вовзращает объект в нужном виде.
        this.gotService.getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError);
    }

    render() {
        // деструктурируем из char
        // const  { char: {name, gender, born, died, culture}, loading} = this.state;
        const  {char, loading, error} = this.state;
        const errorMessage = error ? <ErrorMessage/> : null;
        // если идет загузка данных - покажи спиннер
        const spinner = loading ? <Spinner/> : null;
        // если загрузки нет и нет ошибки - покажи контент
        // если загрузка или ошибка тру
        const content = !(loading || error) ? <View char={char}/> : null;   
        return (
            <div className="random-block rounded">
                {errorMessage}
                {spinner}
                {content}
            </div>
        );
    }
}

const View = ({char}) => {
    // <> - это react.Fragment

    const {name, gender, born, died, culture} = char;

    return (
        <>
        <div className="random-block rounded">
                <h4>Random Character: {name}</h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Gender </span>
                        <span>{gender}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Born </span>
                        <span>{born}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Died </span>
                        <span>{died}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Culture </span>
                        <span>{culture}</span>
                    </li>
                </ul>
            </div>
        </>
    )
}