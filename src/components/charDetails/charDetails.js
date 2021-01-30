import React, {Component} from 'react';
import gotService from '../../services/gotService.js';
import './charDetails.css';


export default class CharDetails extends Component {

    gotService = new gotService();
    
    state = {
        char: null
    }

    // функцию оюъявили ниже, а вызвали в начале жизненного цикла компонента
    componentDidMount() {
        this.updateChar();
    }
    // принимает prevProps и prevState
    // prevProps - это предыдущие props, с ними можно сверить новые.
    // коспонент перерисовывается только при поступлении новых props или изменении state
    // если пропсы новые, то обнови персонажа (state)
    // ПРОВЕРКА НУЖНА ОБЯЗАТЕЛЬНО
    // Иначе после обновления пропсов обновится стейт, он запустит обновление и опять запустится функция
    // обновления стейта.
    componentDidUpdate(prevProps) {
        if(this.props.charId !== prevProps.charId) {
            this.updateChar();
        }
    }

    updateChar() {
        const {charId} = this.props;
        if (!charId) {
            return
        }
        //charId - id из app, и по нему мы заказываем конкретного персонажа.
        // получаем промис
        this.gotService.getCharacter(charId)
            .then((char) => {
                this.setState({char})
            })

            // this.foo.bar = 0;
    }

    render() {

        if (!this.state.char) {
            return <span className="select-error">Please select a character</span>
        }
        const {name, gender, born, died, culture} = this.state.char;
        return (
            <div className="char-details rounded">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Gender</span>
                        <span>{gender}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Born</span>
                        <span>{born}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Died</span>
                        <span>{died}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Culture</span>
                        <span>{culture}</span>
                    </li>
                </ul>
            </div>
        ); 
    }
}
