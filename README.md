# Pokemon Explorer Application

## Project Setup and Running Instructions

## Design and Component Decisions

### Structure

### Components

The first thing I did to start this project was read through the shadcn/UI docs as I had not previously used this package. On looking through the components I noticed a lot of similarities to the Figma design. Therefore, I actively matched different parts of the Figma design to the different components before even beginning to code. These are shown here:

- Pokemon Type: _Badge_
- Pagiation: _Buttons_
- Search Bar: _Input + Button_
- Pokemon Sections (Both on main page and after search): _Cards_
- Loading State Indicators: _Skeletons/Progress??????_ TODO CHECK THIS AT END

### Interpretations/Deviations

## State Management Approach

I chose to take all the information about the pokemon required for each page

## API Interactions Strategy

I have a very basic helper function that is being used to make all of the connections to the API, which are all called from a seperate component that is then

I chose to have all of the pokemon and their data loaded in one big API fetch server-side at the beginning, to load the list of pokemon, and then passed the data down to the "card2 component to save state and display the pokemon. This saved rendering time, as although it is a large component with many concurrent fetches in "Promise.all" it

## Challenges Encountered

### React Hooks

Having been a while since using React, I had to relearn how to use Hooks and which files they can be used in (client/server components), as well as the best file structure and layout to enable use of State for the information from the API as well having successful fetches.
TODO ADD MORE DATA HERE.

Since Next.js always defaults to having all files as server components to improve performance, this was trickier for me to debug having not remembered this. IMPORTANT INFORMATION BUT NOT SURE HOW TO PHRASE

SOME OF THIS IS ACTUALLY JUST REACT STUFF SO MAYBE I SHOULDN'T SAY IT?????

- This link explains use client and use server: https://react.dev/reference/rsc/use-client#serializable-types

### Client vs Server Side Components

I chose to create a custom hook to handle the API access for the website. I thought this would be most efficient in terms of space and calling of the function. However, I encountered a lot of issues with then transferring the data from the client component API call into the server component web pages.

Maybe talk about choice to not Server Side Render (SSR) the pages, despite it increasing performance and ensuring all pages are rendered on the first time, there is not a lot of need for it when it is such a basic page. Furthermore, since the instructions clearly state to store the pokemon information in the web pages state it is not appropriate to do this. Additionally, the dynamic interaction whereby each pokemon needs to be individually selectable is easier and better to do in a client-side rendered component as compared to one

### Next File Structure

I had a surprising amount of trouble correctly organising the file structure for Next. Having built previous applications with a Laravel PHP backend, and so following a Model-View-Controller structure, I found it harder than expected to decipher the docs on how I should be organising routes and file structure.

### Inability to match Figma

There are certain aspects (such as Bulbasaurs description) which are impossible to match from the original design as it doesn't exist in the PokeAPI, so I had to make substitutions from what was available on the API.
List:

- Bulbasaur's description could not be found within the list of descriptions for that Pokemon on the API.
- Bulbasaur's weakness to "Ice" type pokemon, could not be found as a weakness for either of Bulbasaur's types, and was instead replaced with "Ground" which "Poison" type is weak to.

## Bonus Features

## Self-Reflections
