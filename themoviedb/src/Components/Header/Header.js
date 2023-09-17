import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = () => {
        if (searchQuery) {
            navigate(`/search?query=${searchQuery}`);
        }
    };

    return (
        <div className="Header">
            <NavLink exact to="/" activeClassName="active-link" className="Main">
                {location.pathname === '/' ? 'Головна' : 'Перейти на головну'}
            </NavLink>
            <div className="search">
                <input
                    type="text"
                    placeholder="Пошук..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button onClick={handleSearch}>Пошук</button>
            </div>
            <NavLink className="user">
                <img
                    src="https://cdn-icons-png.flaticon.com/512/1144/1144760.png"
                    alt="User"
                    style={{ width: '3vw' }}
                    title="User"
                />
            </NavLink>
        </div>
    );
};

export default Header;
