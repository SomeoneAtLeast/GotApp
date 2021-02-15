import React, {Component} from 'react';
import './randomChar.css';
import gotService from '../../services/gotService';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';
import PropTypes from 'prop-types';

export default class RandomChar extends Component {

    gotService = new gotService();
    state = {
        char: {},
        loading: true,
        error: false
    }
    // А это тоже пропсы по умолчанию, они как аргументы функции по умолчанию.
    // они отработают, если настоящие пропсы не поступят или поступят неверны.
    // можно задавать внутри со static, а можно снаружи с указанием компонента.
    static defaultProps = {
        interval: 15000
    }

    // можно прям тут
    // вот с библиотекой
    static propTypes = {
    interval: PropTypes.number
    }
    
    componentDidMount() {
        this.updateChar();
        this.timerId = setInterval(this.updateChar, 15000);
    }

    componentWillUnmount(){
        clearInterval(this.timerId);
    }

    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false
        })
    }

    onError = (err) => {
        this.setState({
            error: true,
            loading: false
        })
    }

    updateChar = () => {
        const id = Math.floor(Math.random()*140 + 25); //25-140
        this.gotService.getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError);
    }

    render() {
        const { char, loading, error } = this.state;

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
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

// // Это пропсы по умолчанию, как аргументы функции по умолчанию.
// // они отработают, если настоящие пропсы не поступят или поступят неверны.
// RandomChar.defaultProps = {
//     interval: 15000
// }

// Проверка пропсов на правильность вручную, но лучше библиотекой propTypes (npm i prop-types)
// RandomChar.propTypes = {
//     // props - пропсы
//     // propName - имя конкретного пропса
//     // componentName - имя компонента
//     interval: (props, propName, componentName) => {
//         // берем все пропсы и ищем именно интервал
//         const value = props[propName];
//         // проверям, что число и не нан
//         if (typeof value === "number" && !isNaN(value)) {
//             return null
//         }

//         return new TypeError(`${componentName}: ${propName} должен быть числом`)
//     }
// }

// вот с библиотекой
RandomChar.propTypes = {
    interval: PropTypes.number
}

const View = ({char}) => {
    const {name, gender, born, died, culture} = char;
    return (
        <>
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
        </>
    )
}