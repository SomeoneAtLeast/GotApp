import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage';
import {CharacterPage, BooksPage, HousesPage, BooksItem} from '../pages';
import gotService from '../../services/gotService';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import './app.css';


export default class App extends Component {
    gotService = new gotService();

    state = {
        showRandomChar: true,
        error: false,
        selectedHouse: 20
    };

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
    };


    render() {
        const char = this.state.showRandomChar ? <RandomChar/> : null;

        if (this.state.error) {
            return <ErrorMessage/>
        }

        return (
            <Router> 
                {/* Если тут использовать реакт фрагмент - могут сломаться стили,
                это связано с Router */}
                <div className='app'>
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
                        {/* Передаем путь и компонент, который будет рендериться
                         по адресу этой страницы */}
                         {/* Если не передать exact, то Route будет смотреть на начало ссылки,
                         То есть на всех страницах, в чьих путях есть '/' - будет отображаться
                         Этот элемент, а exact задает строгое соответсвие */}
                         {/* exact = exact={true}. Первый вариант - exact всегда true */}
                        <Route path='/' component={() => <h1>Welcome to GOT DB</h1>} exact/>
                        <Route path='/characters' component={CharacterPage} />
                        <Route path='/books' component={BooksPage} exact/>
                        {/* Тут пусть динамический, то есть books/1-2-3-4 или название
                        (книги или товары) */}
                        {/* {match} - это то, что мы получаем из Route.
                        Еще можно получмить Location и history */}
                        {/* match это данные о том, как именно panh совпал с текущим адресом
                        там же сть Id */}
                        {/* location - это положение route в текущий момент
                        History - API для перехода между страницами. */}
                        <Route path='/books/:id' render={({match}) => {
                            // Вот тут вынимаем id из match
                            const {id} = match.params;
                        return <BooksItem bookId={id}/>}}/>
                        <Route path='/houses' component={HousesPage} />
                    </Container>
                </div>
            </Router>
        )
    }

};
