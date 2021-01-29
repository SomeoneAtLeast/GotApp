import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../error';
import CharacterPage from '../characterPage';

import './app.css';

export default class App extends Component {
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
                </Container>
            </>
        );
    }
};