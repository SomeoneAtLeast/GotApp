import React, {Component} from 'react';
import ItemList from '../itemList';
import ErrorMessage from '../errorMessage';
import gotService from '../../services/gotService';
import {withRouter} from 'react-router-dom'; // Компонент высшего порядка может оборачивать другие
// компоненты, чтобы дать им какие-то свойства. В нашем случае мы дадим
// BooksPage те пропс, которе есть у router

export class BooksPage extends Component {
    gotService = new gotService();

    state = {
        selectedBook: null,
        error: false
    }

    onItemSelected = (id) => {
        this.setState({
            selectedBook: id
        })
    }

    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    render() {
        if (this.state.error) {
            return <ErrorMessage/>
        }

        return (
            <ItemList 
            onItemSelected={(itemId) => {
                // получаем history из пропс при помощь wihtRouter
                // push - это куда переходим, адрес.
                // кликнули на 3 книгу, попали на страницу 3 книги
                this.props.history.push(itemId)
            }}
            getData={this.gotService.getAllBooks}
            renderItem={({name}) => name}/>
        )
    }
}

// вот оно 
// теперь у booksPage есть math, history, location
export default withRouter(BooksPage);