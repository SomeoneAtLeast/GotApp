import React, {Component} from 'react';
import Spinner from '../spinner';
import './itemList.css';

export default class ItemList extends Component {

    state = {
        itemList: null
    }

    componentDidMount() {
        const {getData} = this.props;
        // получаем данные и заносим в стейт
        getData()
            .then((itemList) => {
                this.setState({
                    itemList
                })
            })
    }

    renderItems(arr) {
        // item - объект, который помещаем на страницу. 
        return arr.map((item, i) => {
            const {id} = item;
            // здесь получаем то, что запросили в charactePage
            // renderItem={(item) => item.name}
            const label = this.props.renderItem(item);
            return (
            <li 
                className="list-group-item"
                key={id}
                onClick={() => this.props.onCharSelected(id)}
                >
                {label}
            </li>
            )
        })
    }
    render() {

        const {itemList} = this.state;

        // если персонажей нет - пусти спиннер.
        if (!itemList) {
            return <Spinner/>
        }

        const items = this.renderItems(itemList)

        return (
            <ul className="item-list list-group">
                {items}
            </ul>
        );
    }
}