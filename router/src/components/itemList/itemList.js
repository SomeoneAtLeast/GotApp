import React, {Component} from 'react';
import './itemList.css';
import Spinner from '../spinner';
import PropTypes from 'prop-types';
import gotService from '../../services/gotService';

// нет стейта, можно переделать в функцию.
 class ItemList extends Component {

    // можно прям тут
    // проверка пропсов на верный тип с помощью библиотеки propTypes
    static propTypes = {
    onItemSelected: PropTypes.func,
    // get data должен быть массивом из объектов
    // getData: PropTypes.arrayOf(PropTypes.object)

    }

    renderItems(arr) {
        return arr.map((item) => {
            const {id} = item;

            const label = this.props.renderItem(item);

            return (
                <li 
                    key={id}
                    className="list-group-item"
                    onClick={ () => this.props.onItemSelected(id)}>
                    {label}
                </li>
            )
        })
    }

    render() {
        const {data} = this.props;
        const items = this.renderItems(data);


        return (
            <ul className="item-list list-group">
                {items}
            </ul>
        );
    }
}

// проверка пропсов на верный тип с помощью библиотеки propTypes
ItemList.propTypes = {
    onItemSelected: PropTypes.func,
    // get data должен быть массивом из объектов
    // getData: PropTypes.arrayOf(PropTypes.object)

}

// Фукция высшего порядка (функция обертка) HOS(C)
// может принимать пропс и передавать дальше
// здесь мы можем собрать логику и отделить ее от отображения
// View - аргумент в который будем вкладывать компонент, который хотим отобразоить
const withData = (View, getData) => {
    // возвращает безымянный класс
    return class extends Component {
        state = {
            data: null
        }

        componentDidMount() {
            getData()
                .then( (data) => {
                    this.setState({
                        data
                    })
                })
        }

        render() {
            const {data} = this.state;

            if (!data) {
                return <Spinner/>
            }

            // Собрали все пропсы из главной функции.
            return <View {...this.props} data={data}/>
        }
    }
}
const {getAllCharacters} = new gotService();
export default withData(ItemList, getAllCharacters);