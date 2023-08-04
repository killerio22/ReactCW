import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
    const location = useLocation();

    return (
        <div className="Header">
            {location.pathname === '/' ? (
                <NavLink exact to={'/'} activeClassName="active-link">
                    Головна
                </NavLink>
            ) : (
                <NavLink exact to={'/'} activeClassName="active-link">
                    Перейти на головну
                </NavLink>
            )}
        </div>
    );
};

export default Header;
