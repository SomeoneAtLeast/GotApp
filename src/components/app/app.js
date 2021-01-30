import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../error';
import CharacterPage from '../characterPage';
import ItemList from '../itemList';
import CharDetails from '../charDetails';
import gotService from '../../services/gotService.js';

import './app.css';

export default class App extends Component {
    gotService = new gotService();
    state = {
        showRandomChar: true,
        error: false
    }
// Если произошла ошибка
// У каждого компонента может быть свой
 // может падать 1 компонент, вместо всего приложения.
// ловит ошибки только в рендере и состоянии
// в личных методах не сработает
// в асинхронных операциях тоже не работает
    componentDidCatch() {
        console.log('error');
        this.setState({
            error: true
        })
    }

    toggleRandomChar = () => {
        this.setState((state) => {
            return {
                showRandomChar: !state.showRandomChar
            }
        });
    }

    render() {

        const char = this.state.showRandomChar ? <RandomChar/> : null;
        if(this.state.error) {
            return <ErrorMessage/>
        }
        return (
            <> 
                <Container>
                    <Header />
                </Container>
                <Container>
                    <Row>
                        <Col lg={{size: 5, offset: 0}}>
                            {char}
                            <button 
                                className="toggle-btn"
                                onClick={this.toggleRandomChar}>Toggle random character</button>
                        </Col>
                    </Row>
                    <CharacterPage/>
                    <Row>
                        <Col md='6'>
                            <ItemList 
                                onCharSelected={this.onCharSelected}
                                getData={this.gotService.getAllBooks}
                                // renderItem может отображать и персонажей, и книги, и дома
                                // она универсальна
                                renderItem={(item) => item.name}/>
                        </Col>
                        <Col md='6'>
                            <CharDetails charID={this.state.charID}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col md='6'>
                            <ItemList 
                                onCharSelected={this.onCharSelected}
                                getData={this.gotService.getAllHouses}
                                // renderItem может отображать и персонажей, и книги, и дома
                                // она универсальна
                                renderItem={(item) => item.name}/>
                        </Col>
                        <Col md='6'>
                            <CharDetails charID={this.state.charID}/>
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
};