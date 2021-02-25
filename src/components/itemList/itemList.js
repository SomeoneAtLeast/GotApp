import React, {useState, useEffect} from 'react';
import Spinner from '../spinner';
import './itemList.css';

function ItemList ({getData, onItemSelected, renderItem}) {
    // хук со стейтом
    //itemList (стайт) - [] вот он
    // updateList - кастоманая функция для изменения стейта
    const [itemList, updateList] = useState([])

    // заменят жизненные циклы (componentDidMount() и тп), создание, обновление, удаление.
    useEffect(() => {
        getData()
            .then((data) => {
                updateList(data)
            })
    }, []) // [] - говорит о том, что выполнять нужно только при появлении и исчезновении, но не при обновление. Это чтобы не было кучи запросов и утечки памяти


    function renderItems(arr) {
        // item - объект, который помещаем на страницу. 
        return arr.map((item, i) => {
            const {id} = item;
            // здесь получаем то, что запросили в charactePage
            // renderItem={(item) => item.name}
            const label = renderItem(item);
            return (
            <li 
                className="list-group-item"
                key={id}
                onClick={() => onItemSelected(id)}
                >
                {label}
            </li>
            )
        })
    }

        // если персонажей нет - пусти спиннер.
        if (!itemList) {
            return <Spinner/>
        }

        const items = renderItems(itemList)

        return (
            <ul className="item-list list-group">
                {items}
            </ul>
        );
}

export default ItemList;