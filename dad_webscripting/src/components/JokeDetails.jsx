// From the react library we are using using useState to manage state in our components, we are using useEffect to fetch data from the API, and we are using useRef to access elements on the page that we want to animate
import React, { useState, useEffect, useRef } from "react";
// Our dependencies from react router dom. We are using useParams to get the id of the joke from the url, and we are using Link to navigate to the home page, and we are using useNavigate to navigate to the saved jokes page
import { useParams, Link, useNavigate } from "react-router-dom";
// Our gsap import is used for animations in our component.
import gsap from "gsap";
// Importing the navbar component to ensure that users can navigate back to the homepage, and the saved jokes page.
import Navbar from "./Navbar";

const JokeDetails = () => {
    // We use the useParamhooks from react router and extract the id of the joke from the url to identify specific jokes. The id is then passed to the fetchJokeById function to fetch the details of the joke which is then displayed on the page.
    const { id } = useParams();
    // Here we use ethe useNavigate hook from react router dom to navigate to the saved jokes page and the home page
    const navigate = useNavigate();

     // Here we are creating a variable to store our jokes from the API, a variable to hold the search query, a variable to hold the loading state, and a variable to hold the error state.
    // What all these do is essentially, stores a joke, query, loading state or error state that is defined as empty intially. Then the function to set each value is defined by the useState hook that is passed through setJokes, setQuery, setLoading, and setError. These set functions are used to update the values of the variables in response to changes in the state triggered by the user, api calls or other events.
    const [joke, setJoke] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    //  We apply the same logic to the isSaved variable, which is used to determine if a joke is saved or not. When the joke is saved, the isSaved variable is set to true, and when the joke is not saved, the isSaved variable is set to false.
    const [isSaved, setIsSaved] = useState(false);

    // Elements on the DOM that have references that will be used later in the GSAP animation useEffect hook code block that is used to animate the page.
    const pageRef = useRef(null);
    const jokeRef = useRef(null);
    const buttonsRef = useRef(null);

    // Here we are using useEffect to fetch the joke by id from the API. We pass the id as a parameter to the fetchJokeById function that fetches the joke database of the API. We need to ensure that the useEffect hook runs when the id changes because we want to fetch a new joke when the user navigates to a different joke or refreshes the page/joke. Also the data is being fetched from the api it is an asynchronous operation.
    useEffect(() => {
        // The fetchjokebyId function called is responsible for fetching the joke from the API based on the id passed to it. That way we can display the joke on the page that the user pressed.
        fetchJokeById(id);
    }, [id]);

    // Our fetchjokebyID function take in a parameter called jokeId which is the id of the joke that we want to fetch from the API.
    const fetchJokeById = (jokeId) => {
        // We indicate that the loading state is true by setting the setLoading state variable to true, which then assigns the value to the loading variable.
        setLoading(true);
        // Here we send our api fetch request to the API, we add the header 'Accept: application/json' to the api call so that the api returns the data in json format. We specifically ask for the joke with the id that we passed to the function.
        fetch(`https://icanhazdadjoke.com/j/${jokeId}`, {
            headers: { Accept: "application/json" },
        })
         // when the results are return we respond to the data returned fron the api by parsing it as json data then assigning it to the setJokes function.
            .then((response) => response.json())
        // Here our data variable contains the the joke data returned from the API
            .then((data) => {
        // We set the joke state variable to the data returned from the by assigning the data parsed to the setJoke function.
                setJoke(data);
         // because we have succesffuly sent our api call, we set the loading state to false.
                setLoading(false);
        // we then check if the joke is saved or not.
                checkIfSaved(data);
            })
            .catch(() => {
          // we ask ourr function to catch the error during the api call, and define it in the error state variable returning the message failed to load the joke.
                setError("Failed to load the joke.");

        // we then set the loading state to false incidcating that the api call has finished.
                setLoading(false);
            });
    };

    // This function is responsible for fetching a new random joke from the API and does not take any parameters/arguments.
    const fetchNewRandomJoke = () => {
        // We indicate that the loading state is true by setting the setLoading state variable to true, which then assigns the value to the loading variable.
        setLoading(true);
        // Here we send our api fetch request to the API, we add the header 'Accept: application/json' to the api call so that the api returns the data in json format.
        fetch("https://icanhazdadjoke.com/", {
            headers: { Accept: "application/json" },
        })
        // when the results are return we respond to the data returned fron the api by parsing it as json data then assigning it to the setJokes function.
            .then((response) => response.json())
        // Here our data variable contains the the joke data returned from the API
            .then((data) => {
        // The react router dom navigate function is used to navigate to the joke details page with the id of the joke that was just fetched, which is rendered in the joke details page.
                navigate(`/joke/${data.id}`);
            })

            .catch(() => {
                // we ask ourr function to catch the error during the api call, and define it in the error state variable returning the message failed to fetch a new joke.
                setError("Failed to fetch a new joke.");
            // we then set the loading state to false incidcating that the api call has finished.
                setLoading(false);
            });
    };

    // This function is responsible for checking if a joke is saved or not by taking the arugment joke which is the joke that we want to check if it is saved or not.
    const checkIfSaved = (joke) => {
    // The JSON.parse function is used to parse the data from the local storage, which is the saved jokes. If the key savedJokes does not exist in the local storage, then the function returns an empty array.
    // || [] is the short hand for if the key savedJokes does not exist in the local storage, then the function returns an empty array.
        const savedJokes = JSON.parse(localStorage.getItem("savedJokes")) || [];
    // This line checks if the savedJokes array contains a joke with the same id as the one passed to the function using the some method. If the joke has the same id as the one passed to the function, then the function returns true, indicating that the joke is saved.
        setIsSaved(savedJokes.some((savedJoke) => savedJoke.id === joke.id));
    };

    // Our saveJoke function is responsible for saving a joke to the local storage that does not take any parameters/arguments. Which is triggered when the user clicks the save button next to the joke.
    const saveJoke = () => {
        // We are checking if the savedJokes key exists in the local storage. If it does not exist, we create an empty array and store it in the savedJokes variable.
        // When the value returns as null, it will return an empty array as value instead, in the case that a saved joke is added to the local storage it can be found in the savedJokes array.
        const savedJokes = JSON.parse(localStorage.getItem("savedJokes")) || [];
        // Essentially this line is checking the savedJokes array to see if there is a joke with the same id as the one passed to the function using the some method. IF the joke has the same id as the one passed to the function, then the function returns true, indicating that the joke is saved. the ! operator is used to invert the result of the some method, so if the joke is not saved, then the function returns false, indicating that the joke is not saved.
        if (!savedJokes.some((savedJoke) => savedJoke.id === joke.id)) {
        // The line below is adding the joke to the savedJokes array. Using the push method, we are adding the joke to the savedJokes array.
            savedJokes.push(joke);
        // This line is updating the local storage with the JSON.strinify method converting the savedJokes array into a string that can stored in local storage.
            localStorage.setItem("savedJokes", JSON.stringify(savedJokes));
        // This line is updating the isSaved state variable to true, indicating that the joke is saved.
            setIsSaved(true);
        }
    };

    // GSAP animations 
    useEffect(() => {
        gsap.fromTo(
            // On page load the page is transparent, and 20 pixels down from the top of the page.
            pageRef.current,
            { opacity: 0, y: 20 },
            // On page load the page is opaque, and 0 pixels down from the top of the page. This animations occurs over one second and starts slowly and finishes quickly.
            { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
        );

        gsap.fromTo(
            // A similar animation is used here, started the joke details as transparent, and 50 pixels down from the top of the page. 
            jokeRef.current,
            { opacity: 0, y: 50 },
            // After a delay out half a second the opacity becomes1 and the y position becomes 0. This animation occurs over one second and starts slowly and finishes quickly.
            { opacity: 1, y: 0, duration: 1, delay: 0.5, ease: "power2.out" }
        );

        gsap.fromTo(
            buttonsRef.current?.children || [],
            // The buttons are transparent, and 30 pixels down from the top of the page
            { opacity: 0, y: 30 },
            // After a delay out half a second the opacity becomes1 and the y position becomes 0. This animation occurs over one second and starts slowly and finishes quickly. There is a stagger of 0.2 seconds between each button.
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "power2.out",
                delay: 0.8,
            }
        );
    }, []);

    return (
        <>
        <Navbar />
        <div
        // Our gsap reference for the entire page, this div wraps the entire jokeDetails component.
            ref={pageRef}
            className="flex flex-col items-center justify-center min-h-screen bg-white text-black"
        >
            <h1 className="text-5xl font-extrabold mb-12 text-center mt-20">Joke Details</h1>
            <div
            // Our gsap reference for the joke details, this div wraps the entire joke details component.
                ref={jokeRef}
                className="w-full max-w-3xl p-6 border-2 border-black text-center"
            >
                {/* If our joke is loading, then we show a loading message. The && operator is used to check if both the loading and error variables are true. If both are true, then we show the loading message. If only one is true, then we show the error message. */}
                {loading && <p className="text-lg font-bold">Loading...</p>}
                {/* I applied the same logic here for this error message as above */}
                {error && <p className="text-lg font-bold text-red-500">{error}</p>}
                {/* If the joke has been loaded, then we show the joke details */}
                {joke && (
                    <>
                    {/* This is our joke text that we can display by calling the joke.joke property */}
                        <p className="text-2xl font-bold mb-4">{joke.joke}</p>
                        {/* This is our joke id that we can display by calling the joke.id property */}
                        <p className="text-sm text-gray-600">Joke ID: {joke.id}</p>
                        <button
                        // This is our save buttons that allows us to save the joke to our local storage. Using a onClick event, we are calling the saveJoke function.
                            onClick={saveJoke}
                            className={`mt-6 px-6 py-3 text-lg font-bold border-2 border-black ${
                                isSaved
                                    ? "bg-green-500 text-white cursor-not-allowed"
                                    : "bg-navy text-white hover:bg-yellow hover:scale-105"
                            } transition-transform`}
                            // This is our disabled attribute that allows us to disable the save button if the joke is already saved.
                            disabled={isSaved}
                        >
                            {/*  We are using a ternary operator to check if the joke is saved or not. */}
                            {isSaved ? "Saved" : "Save to Favourites"}
                        </button>
                    </>
                )}
            </div>
            {/* Our gsap reference for the buttons, the div wraps the get new joke button and the back to home button */}
            <div ref={buttonsRef} className="flex space-x-6 mt-8">
                <button
                // Our button has a onClick event that calls the fetchNewRandomJoke function, which will render a new joke. with a new id.
                    onClick={fetchNewRandomJoke}
                    className="px-6 py-3 text-lg font-bold bg-black text-white border-2 border-black hover:scale-105 hover:bg-yellow transition-transform"
                >
                    Get New Joke
                </button>
                <Link
                // Our button has a onClick event that navigates to the home page using link from react router dom.
                    to="/"
                    className="px-6 py-3 text-lg font-bold bg-gray-500 text-white border-2 border-black hover:scale-105 hover:bg-gray-600 transition-transform"
                >
                    Back to Home
                </Link>
            </div>
        </div>
        </>
    );
};

export default JokeDetails;