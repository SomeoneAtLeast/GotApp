import React, {Component} from 'react';
import Spinner from '../spinner';
import gotService from '../../services/gotService.js';
import './itemList.css';

export default class ItemList extends Component {
    gotService = new gotService();

    state = {
        charList: null
    }

    componentDidMount() {
        // получаем персонажей и заносим в стейт
        this.gotService.getAllCharacters()
            .then((charList) => {
                this.setState({
                    charList
                })
            })
    }

    renderItems(arr) {
        return arr.map((item, i) => {
            return (
            <li 
                className="list-group-item"
                key={i}
                // 5 страница, поэтому 41 + i
                onClick={() => this.props.onCharSelected(41 + i)}
                >
                {item.name}
            </li>
            )
        })
    }
    render() {

        const {charList} = this.state;

        // если персонажей нет - пусти спиннер.
        if (!charList) {
            return <Spinner/>
        }

        const items = this.renderItems(charList)

        return (
            <ul className="item-list list-group">
                {items}
            </ul>
        );
    }
}