// I need use state to hold each joke, hold the errors, and loading. I need use effect to fetch jokes for the API, which I am using for scroll trigger as well. I need use ref to access the elements on the page that I want to animate.
import React, { useState, useEffect, useRef } from "react";
// The links on the page will go to the JokeDetails component when users click a joke for a detailed view.
import { Link } from "react-router-dom";
// The nav bar component is availble to user for accessing a list of saved jokes at all times in the header. When you press the title it will take you back to the home page.
import Navbar from "./Navbar";

// Here we are using gsap, and scrolltrigger for animations.
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const Home = () => {
    // Here we are creating a variable to store our jokes from the API, a variable to hold the search query, a variable to hold the loading state, and a variable to hold the error state.
    // What all these do is essentially, stores a joke, query, loading state or error state that is defined as empty intially. Then the function to set each value is defined by the useState hook that is passed through setJokes, setQuery, setLoading, and setError. These set functions are used to update the values of the variables in response to changes in the state triggered by the user, api calls or other events.
    const [jokes, setJokes] = useState([]);
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

  // Here we are reference the dom element pageRef, titleRef, searchBarRef, and jokesListRef. These will be used for GSAP animations. The reason there is null is because we have not rendered the component yet. When they are rendered they will have a value applied to them from the useRef hook. And these values will be the values provided in for our gsap animations.
    const pageRef = useRef(null);
    const titleRef = useRef(null);
    const searchBarRef = useRef(null);
    const jokesListRef = useRef(null);

    // Here we are using gsap and the scroll trigger plugin from gsap to animate our home page. I am intially registering the plugin in the useEffect hook. Then I am using gsap.fromTo to animate the page, title, search bar, and jokes list. Scroll trigger animations are used to trigger the jokes list animation when the user scrolls down the page. So intially there are no jokes visible, but when the user scrolls down the page, the jokes list will appear with a staggered animation.
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        // Here is our page load animation a simple animation that fade our page in.
        gsap.fromTo(
            pageRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
        );

        // Here is our animation for the title, I used the same animation as the page load, however this one has a delay of 0.3 seconds.
        gsap.fromTo(
            titleRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 1, ease: "power2.out", delay: 0.3 }
        );

        // Here is our search bar animation, It fades in and then slides in from the right, with a delay of 0.6 seconds.
        gsap.fromTo(
            searchBarRef.current.children,
            { opacity: 0, y: 20 },
            {
                opacity: 1,
                y: 0,
                stagger: 0.2,
                duration: 0.8,
                ease: "power2.out",
                delay: 0.6,
            }
        );

        // Here is our jokelist animation, it fades in and slides in from the bottom, stagger the appearance of each joke with a delay of 0.2 seconds. The scroll trigger plugin is used to trigger the animation when the user scrolls down the page, so it will not play until a user has triggered the scroll.
        gsap.fromTo(
            jokesListRef.current?.children || [],
            { opacity: 0, y: 20 },
            {
                opacity: 1,
                y: 0,
                stagger: 0.2,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: jokesListRef.current,
                    start: "top center+=100",
                },
            }
        );
    }, [jokes]);

    // This function will fetch jokes from an api that returns dad jokes. That also includes a search feature that returns jokes including the keyword that the user has entered.
    const searchJokes = () => {
        // With setloading set to true, we set the state of loading (the loading state variable) to true. What happens because of this is that the jokes list will be hidden until the api call is complete and the jokes have been fetched. Then the loading state variable will be set to false.
        setLoading(true);
        // Here we are setting our error state variable to an empty string. Because there are no errors intially, the error state will update from being empty after an api call is made and the failure to fetch the jokes is the response returned from the api.
        setError("");
        // Here we are using the keyword 'fetch' to ask for jokes availble from the dad joke api. We add the header 'Accept: application/json' to the api call so that the api returns the data in json format. Why json format? We can update our state variable 'jokes' with the data returned from the api. Which will be assigned to setJokes then update the state variable 'jokes' with the data returned from the api.
        fetch(`https://icanhazdadjoke.com/search?term=${query}`, {
            headers: { Accept: "application/json" },
        })

        // Here we are passing the data returned to us as JSON data. Which we assign to our jokes variable.
            .then((response) => response.json())
            // Here the data is proccessed and assigned to the jokes variables with a array of jokes, in the setJokes function we can see the value (data.results) updating the data that is returned from the api call.
            .then((data) => {
                setJokes(data.results);
                // If the data returned from the api call has no results, then we set the error state variable to no jokes found, updating the error variable value to no jokes found.
                if (data.results.length === 0) setError("No jokes found.");
                // when these api call is complete, and the api has either responded with an array of data (success) or an empty string (failure) the process will be complete and we can set loading to false.
                setLoading(false);
            })

                // in case of an error, we ask our function to catch the error during the api call, and define it in the error state variable returning the message failed to fetch jokes. then we set the loading to false because we have succesfully sent the api call.
            .catch(() => {
                setError("Failed to fetch jokes.");
                setLoading(false);
            });
    };

    // after the api call response results are assigned to the setJoke function and the loading has been set to false, im calling the use effect jook to fetch a list of jokes to display the list of jokes onto the page.
    useEffect(() => {
        // so here we set the loading state to true before we call/fetch the api data. by setting the loading state to true, we indicate the the api call is in effect.
        setLoading(true);
        // we send our fetch request to the api using the 'limit=10' parameter in our query request to limit the number of results to 10. the fetch funtion promise resolves with the data returned from the api.
        fetch("https://icanhazdadjoke.com/search?limit=10", {
            // here we specify in our headers atrribute that we will accept the request in json format.
            headers: { Accept: "application/json" },
        })
        // when the results are return we respond to the data returned fron the api by parsing it as json data then assigning it to the setJokes function.
            .then((response) => response.json())
        // when the data is parsed as json data, we assign it to the setJokes function with the results of the api call in data.results.
            .then((data) => {
                setJokes(data.results);
        // because we have succesffuly sent our api call, we set the loading state to false.
                setLoading(false);
            })
            .catch(() => {
        // we ask ourr function to catch the error during the api call, and define it in the error state variable returning the message failed to fetch jokes.
                setError("Failed to fetch jokes.");
                setLoading(false);
            });
    }, []);

    return (
        <div ref={pageRef} className="bg-white text-black min-h-screen">
            {/* The nav bar component is availble on across all pages when users want a list of saved jokes or to reload the page/direct to the home page. */}
            <Navbar />
            <div className="flex flex-col items-center justify-center pt-32 px-6">
               {/* Joke title and search bar  */}
                <h1
                // I am defining the reference of the joke archive title so that I can call this specific element in my gsap animations.
                    ref={titleRef}
                    className="text-6xl font-extrabold mb-16 text-center mt-16 "
                >
                    JOKE ARCHIVE
                </h1>


                <div
                // I am definining the reference of the search bar because using gsap it will be animated upon page load.
                    ref={searchBarRef}
                    className="mb-12 flex space-x-4 w-full max-w-3xl"
                >
                    {/* Here we have an input element that accepts text type inputs, specified in the type attribute equal to text. In the value attribute, we are setting the value of the input to the query state variable. This means when the component renders, the user input field will display the value of their query. When the user searches 'dogs' the input field will display 'dogs',once the jokes are returned from the api call.  */}
                    <input
                        type="text"
                        value={query}
                        // Our event handler for managing changes is triggered when user types a different value in the input field. It takes an argument called e, which represents the event object.
                        // The event object contains information about the event that triggered the handler, such as the value of the input field.
                        // Then the value of the input field is reassigned to the query state variable.
                        onChange={(e) => setQuery(e.target.value)}
                        // Here we have set our placeholder text in the input field to type a joke keyword, prompting users to interact with the search bar.
                        placeholder="Type a joke keyword..."
                        // Basic styles for the input field.
                        className="flex-grow px-4 py-3 text-lg font-bold border-2 border-black focus:outline-none focus:border-blue-500"
                    />
                    {/* we call our search jokes function above, to return api results containing the keyword indicated by users in their search query. */}
                    <button
                        onClick={searchJokes}
                        className="px-8 py-3 text-lg font-bold bg-black text-white hover:bg-blue-500 hover:scale-105 transition-transform"
                    >
                        SEARCH
                    </button>
                </div>

                {/* Here we are using the value of the loading state variable and error state variable to render a loading message or an error message in certain cases.
                    If the loading state is set to true, then we render a loading message. Using the && operator, we can check if the loading state is true, and if it is, we render the loading message.

                    I reused the code and applied the same logic to the error state variable, so if the error state variable contains a true value, then we render the error message.
                */}
                {loading && <p className="text-lg font-bold">Loading...</p>}
                {error && <p className="text-lg font-bold text-red-500">{error}</p>}

                {/* Jokes List */}

                 {/* Here we use an equation to determine if there is value in the jokes variable, and if the array is empty or not. If true the array will render a list of jokes from the jokes variable, that recieve a succesful response from the api. If the jokes state variable is empty, then we render a message that no jokes were found. */}
                {jokes.length > 0 ? (
                    // I am referencing the unordered list joke of elements so that I can apply a scroll trigger animation using gsap.
                    <ul ref={jokesListRef} className="space-y-8 w-full max-w-3xl">
                        {/* I am mapping the jokes array using the map method we learned in class. Fetching data from the jokes arrary and rendering a list of jokes */}
                        {jokes.map((joke) => (
                            <li
                            // Each of the jokes in the array has a unique id, which is used to identify them from another joke in the array. By assign the key attribute to the id of the joke we can ensure that the elements in the array are rendered by react in the correct order.
                                key={joke.id}
                                className="p-6 border-2 border-black hover:bg-gray-100 transition-transform transform hover:scale-105"
                            >
                                {/* I am using the link element from react router dom, and setting the to attribute to the id of a joke that is displayed in the list, because i have the key set to each jokes ID we ensure that on click the user will be redirected to the jokedetails component with the joke that was clicked rendered on the page. */}
                                <Link
                                    to={`/joke/${joke.id}`}
                                    className="text-lg font-bold hover:underline"
                                >
                                    {/* This is the joke itself. */}
                                    {joke.joke}
                                </Link>
                            </li>
                        ))}
                    </ul>
                ) : (
                    // Using the same operators that I applied for the loading and error messages, we can check if the loading state is false, and if it is, we render the no jokes found message.
                    !loading && (
                        <p className="text-lg font-bold text-center">
                            No jokes found! Try another search.
                        </p>
                    )
                )}
            </div>
        </div>
    );
};

export default Home;