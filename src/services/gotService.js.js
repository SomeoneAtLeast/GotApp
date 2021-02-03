// import React, {Component} from 'react';
// СЕТЕВЫЕ КОМПОНЕНТЫ ПИШЕМ ОТДЕЛЬНО И ИМПОРТИРУЕМ КУДА НАДО
export default class GotService {
    constructor() {
        // выносим одинковую часть адреса
        this._apiBase = "https://www.anapioficeandfire.com/api";
    }

   // async - говорит js, что сейчас будет асинхронная функция
// await - показывает где именно нужно ждать.
// без этого будет ошибка, так как res попытается выполниться раньше,
// чем поступит ответ.
// переделываем методы на фукнции стрелки, чтобы контекст зависел от того, где вызываем
    GetResource = async (url) => {
        // посылает get на url и получает ответ
        // используем apibase
        const res = await fetch(`${this._apiBase}${url}`);
        // у ответа есть метод ок, он значит, что прошло без ошибок
        if (!res.ok) {
            throw new Error(`Не получилось зафетчить ${url}, status: ${res.status} `)
        }

        // some переводит этот ответ в json в виде конструкции Promise, чтобы им можно было удобно пользоваться.
        // если вывести в консоль some, то уже будет просто объект (?)
        // const some = await res.json();  

        return await res.json();
    }

    getAllCharacters = async () => {
        // Метод вернет промис с данными с нужного url
        // ?page=5&pageSize=10
        // ?page=5 - запрос к 5 странице, & - и, Size=10 - 10 персонажей. 
        const res =  await this.GetResource(`/characters?page=5&pageSize=10`);
        // мап создает новый объект/ы по тому образу, котоырй ей передали
        return res.map(this._transformCharacter)
    }

    getCharacter = async (id) => {
        const character = await this.GetResource(`/characters/${id}`);
        return this._transformCharacter(character);
    }

    getAllHouses = async () =>  {
        const res =  await this.GetResource(`/houses/`);
        return res.map(this._transformHouse)
    }

    getHouse = async (id) => {
        const house = await this.GetResource(`/houses/${id}/`);
        return this._transformCharacter(house);
    }

    getAllBooks = async () => {
        const res =  await this.GetResource(`/books/`);
        return res.map(this._transformHouse)
    }

    getBook = async(id) => {
        const book = await this.GetResource(`/books/${id}/`);
        return this._transformCharacter(book);
    }

    // НЕ все api корректно написаны, иногда нужна трансформация в нужный нам вид
    _transformCharacter(char) {
        return {
            name: char.name,
            gender: char.gender,
            born: char.born,
            died: char.died,
            culture: char.culture  
        }

    }

    _transformHouse(house) {
        return {
            name: house.name,
            region: house.region,
            words: house.words,
            titles: house.titles,
            overlord: house.overlord,
            ancestralWeapons: house.ancestralWeapons
        }
    }

    _transformBook(book) {
        return {
            name: book.name,
            numberOfPages: book.numberOfPages,
            publiser: book.publiser,
            released: book.released, 
        }

    }

}

// const got = new GotService();

// // выводит имена персонажей
// got.getAllCharacters()
//     .then(res => {
//         res.forEach(element => console.log(element.name))
//     });

// got.getAllCharacter(130)
//     .then(res => console.log(res))