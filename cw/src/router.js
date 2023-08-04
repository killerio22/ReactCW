import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MoviesPage from './Components/MoviesPage/MoviesPage';
import MovieDetailsPage from './Containers/MovieDetailsPage';
import MoviesByGenrePage from './Containers/MoviesByGenrePage';
import Header from "./Components/Header/Header";
import './router.css'

const AppRouter = () => {
    const [darkTheme, setDarkTheme] = useState(false);

    const toggleTheme = () => {
        setDarkTheme((prevTheme) => !prevTheme);
    };

    const appStyle = {
        backgroundColor: darkTheme ? '#333' : '#fff',
        color: darkTheme ? '#fff' : '#333',
    };

    return (
        <Router>
            <div className="App" style={appStyle}>
                <Header />
                <button onClick={toggleTheme} className="Theme">
                    {darkTheme ? '🌙' : '☀️'}
                </button>
                <Routes>
                    <Route path="/" element={<MoviesPage darkTheme={darkTheme} />} />
                    <Route path="/movies/:id" element={<MovieDetailsPage />} />
                    <Route path="/genres/:genreId" element={<MoviesByGenrePage />} />
                </Routes>
            </div>
        </Router>
    );
};

export default AppRouter;
