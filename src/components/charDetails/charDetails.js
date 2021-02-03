import React, {Component} from 'react';
import gotService from '../../services/gotService.js';
import './charDetails.css';

// Field - компонент, котоырй сможет отображать любые данные в подходящем формате
// char - отображаемый элемент
// field - поле
// label - подпись к полю
const Field = ({char, field, label}) => {
    return (
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">{label}</span>
            <span>{char[field]}</span>
        </li>
    )
}

export {
    Field
}

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
        const {char} = this.state;
        const {name} = this.state.char;

        return (
            <div className="char-details rounded">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                {/* // так мы можем получить из пропсов компененты
                    {this.props.children} */}
                    {/* Перебор детей */}
                    {/* {Этот Map может перебрать, что угодно, не обязательно массив} */}
                    {
                        React.Children.map(this.props.children, (child) => {
                            // Эта запись создаст клона child 
                            // return React.cloneElement(child)
                            // А эта создаст клона child и что-то с ним сделает - передаст char
                            // мы не може менять элементы напрямую, поэтому нужен клон с изменениями
                            return React.cloneElement(child, {char})
                        })
                    }
                </ul>
            </div>
        ); 
    }
}
