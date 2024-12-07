import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Here we import all the components we need in our App, we are using the Router and Routes components from react-router-dom to define our routes and using the home component as our default route.
import Home from './components/Home';
import JokeDetails from './components/JokeDetails';
import SavedJokes from './components/SavedJokes';

const App = () => {
    return (

        // We are wrapping our routes with the router component from react-router-dom. It wraps the entire application and allows us to set the routes for our build.
        <Router>
            <Routes>
                {/* The default path is the home component that specifies to render the home component when the user navigates to the root path. */}
                <Route path="/" element={<Home />} />
                {/* The /joke/:id path is the renders the JokeDetails component that also is followed by an id parameter for when users select a joke from the list available on the home page. */}
                <Route path="/joke/:id" element={<JokeDetails />} />
                {/* The /saved path renders the SavedJokes component and dynamically renders jokes saved by the user based on the state in the SavedJokes component. */}
                <Route path="/saved" element={<SavedJokes />} />
            </Routes>
        </Router>
    );
};

export default App;