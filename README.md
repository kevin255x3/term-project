Hi, my term project uses a Dad Joke API, to fetch a list of dad jokes.
There is a search function that querys keywords to the api, then responds with jokes containing the keyword of the input field.

-- To run the project

Install the node package dependencies in the project build folder.

Run the command, 'cd dad_webscripting'

Check your location, run the command 'ls'

If you are in the project folder, run the command 'npm install'

A folder called node_modules should appear in the project folder containing all the dependencies for this project.

If you have succesfully installed the node package modules run the command 'npm run dev' to view the project.

A localhost link should appear. It looks like this  http://localhost:5173/

Enjoy!

Challenges - Ternary Operators
----------

I did not use ternary operators at all in my previous projects. In this project, I went back and reviewed how to use ternary operators to indicate different state during my api Fetch request. 

I had to ensure that something was returned from a success and failure response from the API, and used the && logical and operator to evaluate if the operands were truthy and falsy, not moving on to the second operand if the first was falsy. So for example, if the error was true it would move on to returning an error message. If not, it would just not display the message. 

Not entirely sure, if I am phrasing my logic correctly, however once I was able to get one working, I did the same for the rest of the other states that I was managaing. The loading state, and the api fetch state. 

I also used,the || [] operator to provided a value of an empty string array into my savedJokes state variable. In order for the local storage to function as expected even if there are no saved jokes, I needed it the value to always remain an array. The || operator would evaluate the value of the savedJokes state and if there was no value or 'null' it would pass it a value of [] so that in the case that an item was saved, it would be able to read it in the format of an array value.

Retrospective
---------

Overall, other than learning how to ensure that the api call was succesfull and returning the information need in the format i needed it in, the other techniques we learned through out the course helped significantly in the project build.

I tried using everything that we covered, I intergrated gsap, react-router-dom, tailwind and useState,useEffect, and useParam.

I also used the map method to return the jokes, I used the some method to identify saved/unsaved jokes by ID. I used the key method to assign the value of each jokes unique identifier for the detailed view of each Joke.

Then used tailwind to style each element, and adding simple gsap transition animations that are triggered by page load and scroll triggers.
 
