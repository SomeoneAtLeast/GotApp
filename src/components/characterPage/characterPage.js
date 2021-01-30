import React, {Component} from 'react';
import {Col, Row} from 'reactstrap';
import ItemList from '../itemList';
import CharDetails from '../charDetails';
import ErrorMessage from '../error';
import gotService from '../../services/gotService.js';

// right left - из props
const RowBlock = ({left, right}) => {
    return (
        <Row>
            <Col md='6'>
                {left}
            </Col>
            <Col md='6'>
                {right}
            </Col>
        </Row>
    )
}

export default class CharacterPage extends Component {
    gotService = new gotService();

    state = {
        selectedChar: 130,
        error: false
    }

    // Если произошла ошибка
    // У каждого компонента может быть свой
    // может падать 1 компонент, вместо всего приложения.
    // ловит ошибки только в рендере и состоянии
    // в личных методах не сработает
    // в асинхронных операциях тоже не работает
    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    // делаем стрелкой, чтобы не было проблем с конетктстом
    // заносит в стетйт выбранного персонажа.
    onCharSelected = (id) => {
        this.setState({
            selectedChar: id
        })
    }

    render() {
        if(this.state.error) {
            return <ErrorMessage/>
        }

        const itemList = (
                <ItemList
                    onCharSelected={this.onCharSelected}
                    getData={this.gotService.getAllCharacters}
                    //Берет объект и возвращает из него что-то конкретное,
                    // что мы хотим получить
                    // renderItem={(item) => `${item.name} (${item.gender})`}
                    renderItem={({name, gender}) => `${name} (${gender})`}/>
        );

        const charDetails = (
            <CharDetails charId={this.state.selectedChar}/>
        )

        return (
            //Тут передаем ему пропс
            <RowBlock left={itemList} right={charDetails}/>
        )
    }
}