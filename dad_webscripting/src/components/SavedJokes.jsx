import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import Navbar from "./Navbar";

const SavedJokes = () => {

    // This is our state variable for the saved jokes. setSavedJokes will update the value of savedJokes when users save a new joke.
    const [savedJokes, setSavedJokes] = useState([]);
    // Here we are reference the dom element pageRef and jokesListRef. These will be used for GSAP animations. The reason there is null is because we have not rendered the component yet. When they are rendered they will have a value applied to them from the useRef hook. And these values will be the values provided in for our gsap animations.
    const pageRef = useRef(null);
    const jokesListRef = useRef(null);

    // Here this function is used to fetch jokes that we have selected to save, and updating the value of the savedjokes state variable. By using the get item method we used the key 'savedJokes' to retrieve our saved jokes located in the local storage.
    useEffect(() => {
        // We specify that our saved jokes will be retrived in json format by using the method JSON.parse and if it is not, we will return with an error.
        const jokes = JSON.parse(localStorage.getItem("savedJokes")) 
        // WE ensure that if there are no saved jokes, we will receieve an empty array instead. The reason why this is important is because that we need to ensure that the jokes state variable is always an array even if we have no saved jokes yet. || [] ensures that the default value provided is an empty array if there are no saved jokes.
        || [];
        // After we have retrieved the saved jokes, we update the value of the savedjokes state variaable by retriveing saved jokes with the setsavedjokes function.
        setSavedJokes(jokes);
    }, []);

    // Here we are defining a function that will remove a joke from the savedjokes state and update the local storage. passing the id of the joke to be removed as a parameter.
    const removeJoke = (id) => {
        // Within our remove joke function we have a function to filter through the array of saved jokes then removing the joke with the id provided and passed through the remove joke function parameters.
        // What this does is use the filter method to create a new array that contains all the saved jokes except for the on that had it's id removed by id from the array in the remove joke function.

        const updatedJokes = savedJokes.filter((joke) => joke.id !== id);
        // Here we update the savedjokes state variable with the new array of saved jokes.
        setSavedJokes(updatedJokes);
        // Here we update the local storafe with the JSON.strinify method converting the updatedJokes array into a string that can stored in local storage, updating the saved jokes with the new value of the updatedjokes array.
        localStorage.setItem("savedJokes", JSON.stringify(updatedJokes));
    };

    // Gsap animations 
    // By making references to the elements that I want to animate I can reference them here and add animations to them.
    useEffect(() => {
        // Intially the opacity of the page is trasnparent and 20 pixels down from where it will be after the animation. Then the animation is set fading the page in and slightly moving it into position upwards over a duration of 1 second.
        gsap.fromTo(
            pageRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
        );
        // Animating the children in the jokes list element that have been saved by the user, so this animation will play everytime it is triggered. For example, when removing a joke from the list, the animation will play to remove the joke from the list.
        gsap.fromTo(
            // Here an empty string will be provided so that the jokes list always remains in a array if there are no saved jokes. Using the || [] operators ensures that the provided value will default to an empty array.
            jokesListRef.current?.children || [],
            // The jokes are intially transparent that fade in over the duration of 0.8 seconds with a stagger of 0.2 seconds. Then they mpove into position upwards over the same duration of time as the opacity is transitioning as well. The power 2 curve eases the animation to start slowly and end fast.
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "power2.out",
            }
        );
    }, [savedJokes]);

    return (
        <>
        {/* Rendering the navigation bar component onto the page, however when the view saved jokes button is clicked it will remain on this page, and when the 'Tito Vic' title text is clicked it will redirect to the home page. */}
            <Navbar />
            {/* I am referencing this element so that I can add animations to it later with GSAP. */}
            <div
                ref={pageRef}
                className="flex flex-col items-center justify-center min-h-screen bg-white text-black pt-20 mt-20"
            >
                <h1 className="text-5xl font-extrabold mb-12 text-center">Saved Jokes</h1>
                <div className="w-full max-w-3xl p-6 border-2 border-black">
                    {/* Here is where the array of jokes is rendered, and if the value of the array is empty or zero the user will see a rendered message that says no saved jokes yet. Otherwise, it will render the saved jokes */}
                    {savedJokes.length === 0 ? (
                        <p className="text-center text-lg font-bold">
                            No saved jokes yet!
                        </p>
                    ) : (
                        //  I am referencing the jokelist and explain the animations that I am adding to it in the use effect codeblock containing the gsap animations.
                        <ul
                            ref={jokesListRef}
                            className="space-y-6 w-full"
                        >
                            {/* Here we are resuing the map method to render the list of jokes that the user has saved, using the same logic as the home page map of jokes. */}
                            {savedJokes.map((joke) => (
                                <li
                                    key={joke.id}
                                    className="p-6 border-2 border-black hover:bg-gray-100 transition-transform transform hover:scale-105 flex justify-between items-center"
                                >
                                    <p className="text-lg font-bold">{joke.joke}</p>
                                    <button
                                        onClick={() => removeJoke(joke.id)}
                                        className="px-6 py-3 text-lg font-bold bg-red-500 text-white border-2 border-black hover:bg-red-600 hover:scale-105 transition-transform"
                                    >
                                        Remove
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </>
    );
};

export default SavedJokes;