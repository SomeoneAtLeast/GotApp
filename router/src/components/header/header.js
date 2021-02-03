import React from 'react';
import './header.css';
import {Link} from 'react-router-dom';

const Header = () => {
    return (
        <div className="header">
            <h3 className="header-title">
                {/* Ведет на главную */}
                {/* Если вместо Link оиспользовать обычные a - при клике будет перезагружаться страница.  
                Но в верстке link будет ссылкой*/}
                <Link to='/'>
                Game of Thrones DB
                </Link>
            </h3>
            <ul className="header-list">
                <li>
                    {/* Если указать /characters - будет переход как бы к файлу /characters
                    А если /characters/, то к папке. Для навигации внутри нужен воторой вариант
                    Без навигации внутри сработает и первый */}
                    <Link to='/characters/'>Characters</Link>
                </li>
                <li>
                    <Link to='/houses/'>Houses</Link>
                </li>
                <li>
                    <Link to='/books/'>Books</Link>   
                </li>
            </ul>
        </div>
    );
};

export default Header;