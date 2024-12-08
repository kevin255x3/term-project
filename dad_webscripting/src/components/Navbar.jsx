import React from "react";
// I am importing link from react-router-dom to allow me to use the Link component to navigate to the saved jokes page.
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="fixed top-0 left-0 w-full bg-black text-white py-4 shadow-md z-20 mb-50">
            <div className="container mx-auto flex justify-between items-center px-6">
                {/* Logo image goes here */}
                <div className="flex items-center space-x-6">
                    <div className="w-24 h-24 bg-gray-800 flex items-center justify-center transform hover:scale-110 transition duration-300">
                        <img
                            src="/vicsotto.jpg"
                            alt="Logo"
                            className="object-cover w-16 h-16"
                        />
                    </div>

                    {/* Nav bar text goes here */}
                    <h1 className="text-3xl font-extrabold tracking-wide uppercase">
                        {/* Here we link the tito vic joke archive text to the home page defining the to attribute with the value of / which is the root path */}
                        <Link to="/" className="hover:text-gray-400 transition">
                            Tito Vic Online
                            <br />
                            Joke Archive
                        </Link>
                    </h1>
                </div>
                {/* Button linking to saved jokes component, this is defined in the to attribute with the value of /saved which we defined earlier in our App.jsx */}
                <Link
                    to="/saved"
                    className="px-6 py-3 text-xl font-bold bg-white text-black border-2 border-black transform hover:scale-105 hover:-rotate-1 transition-transform duration-300"
                >
                    Saved Jokes
                </Link>
            </div>
        </div>
    );
};

// Exporting the navbar component so that we can use it in our app across all components.
export default Navbar;