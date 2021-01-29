import React, {Component} from 'react';
import {Col, Row} from 'reactstrap';
import ItemList from '../itemList';
import CharDetails from '../charDetails';
import ErrorMessage from '../error';

export default class CharacterPage extends Component {
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
        return (
            <Row>
            <Col md='6'>
                <ItemList onCharSelected={this.onCharSelected} />
            </Col>
            <Col md='6'>
                <CharDetails charId={this.state.selectedChar}/>
            </Col>
        </Row>
        )
    }
}