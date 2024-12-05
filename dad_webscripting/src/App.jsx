import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import JokeDetails from './components/JokeDetails';
import SavedJokes from './components/SavedJokes';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/joke/:id" element={<JokeDetails />} />
                <Route path="/saved" element={<SavedJokes />} />
            </Routes>
        </Router>
    );
};

export default App;