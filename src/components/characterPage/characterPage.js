import React, {Component} from 'react';
import ItemList from '../itemList';
import CharDetails, {Field} from '../charDetails';
import ErrorMessage from '../error';
import RowBlock from '../rowBlock'
import gotService from '../../services/gotService.js';


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
    onItemSelected = (id) => {
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
                    onItemSelected={this.onItemSelected}
                    getData={this.gotService.getAllCharacters}
                    //Берет объект и возвращает из него что-то конкретное,
                    // что мы хотим получить
                    // renderItem={(item) => `${item.name} (${item.gender})`}
                    renderItem={({name, gender}) => `${name} (${gender})`}/>
        );

        const charDetails = (
            <CharDetails charId={this.state.selectedChar}>
                {/* Оба филда получат {char} из charDetails
                return React.cloneElement(child, {char}) */}
                <Field field='gender' label='Gender'/>
                <Field field='born' label='Born'/>
                <Field field='died' label='Died'/>
                <Field field='Culture' label='Culture'/>
            </CharDetails>
        )

        return (
            //Тут передаем ему пропс
            <RowBlock left={itemList} right={charDetails}/>
        )
    }
}