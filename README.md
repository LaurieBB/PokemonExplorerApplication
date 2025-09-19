# Pokemon Explorer Application

## Project Setup and Running Instructions

I will make the assumption that the user has an up-to-date version of Node.js and npm installed. If not, install here: https://nodejs.org/en/download/current

- Node.js version used: V22.19.0 (However also tested with latest version 24.8.0 and functions correctly)

<br>

Start-up command-line instructions (can all be run through Git Bash):

- git clone https://github.com/LaurieBB/PokemonExplorerApplication
- cd PokemonExplorerApplication
- npm install
- npm run build
- npm start
- navigate to "http://localhost:3000" as instructed

## Design and Component Decisions

### React Components

TODO COME BACK HERE

I chose to make seperate components for the header, footer, pagination and search bar as these are re-used throughout multiple search pages, as well as attempting to follow the principle of smallest possible components. These can all be found in the "src/components/layout" folder.

My larger components are stored in "src/components/features" which make up the main body of both the Landing Page and the Pokemon Details page. The landing page consists of a client component "/poke-card-layout.jsx" which makes the API calls by calling the "src/api/fetch-pokemon.jsx" function and then iterately calls the "poke-card.jsx" component to show the information found. The "PokeCardLayout" function also handles the State for the landing page.

client components:

- search.jsx
- pagination.jsx

I have made a weird decision in terms of rendering the pages of pokemon, I have used a URL-based method to remember which page to return to when after selecting "return home" on the detailed pokemon page. However, it would be inefficient to constantly use this method to change pages as it would require re-rendering from the server, therefore, I have chosen to have a client-side update of the pages of pokemon, but only on return update the URL.

### shadcn/ui Components

All shadcn/ui components are in "src/components/ui".

The first thing I did to start this project was read through the shadcn/UI docs as I had not previously used this package. On looking through the components I noticed the similarities to the Figma design. Therefore, I actively matched different parts of the Figma design to the different components before even beginning to code. These are shown here:

- Pokemon Type: _Badge_
- Pagiation: _Buttons_
- Search Bar: _Input + Button_
- Pokemon Sections (Both on Landing Page and Details Page): _Card_
- Pokemon Details Stats: _Progress_

### Interpretations/Deviations

I believe the only deviation from the Figma was in the layout of the Weaknesses, as there were more than were anticipated (for the Figma example Bulbasaur at least), for reasons I will discuss below. To account for the greater numbers, they had to be arranged as a grid, however I left the desired list format commented out above this line, so it can easily be reinstated later when the bug is resolved.

## State Management Approach

I chose to take all the information about the pokemon required for each page

Originally, I was loading all the pokemon data from the server-side as I read that keeping as many components as possible as server-components is ideal. However, when I started using state from within the "poke-card-layout" to hold the page number, and stopped individually rendering each page of pokemon from the server-side and began loading the API calls client-side within this component, based on the page number state, it performed far more efficiently with a noticable performance improvement. It updates when either the pageNum or the SearchBar updates.

## API Interactions Strategy

I have a very basic helper function that is being used to make all of the connections to the API, which are all called from a seperate component that is then

I chose to have all of the pokemon and their data loaded in one big API fetch server-side at the beginning, to load the list of pokemon, and then passed the data down to the "card" component to save state and display the pokemon. This saved rendering time, as although it is a large component with many concurrent fetches in "Promise.all" it

## Challenges Encountered

I AM SO CONFUSED - DO I NEED A "PAGES" DIRECTORY OR NOT???? THE NEXT JS DOCS SAY I DO, BUT THEN OTHER THINGS SAY THAT I NEED TO HAVE ALL PAGES IN "app" I DO NOT UNDERSTAND

### Following Next best practices

Originally, I implemented all of the fetches on the client-side, as I realised that any hooks used had to be in a client component, and I thought that to correctly store state (as is the requirements), I had to immediately save this data. However, as I went on and did more research into Next, I came to the conclusion that fetching all the data server-side and passing it through the components and storing state on the client-side at the furthest possible leaf-node component was the ideal structure to follow, so I went through and changed my code completely.

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

## Bonus Features

### Loading state indicators

The "Spinner" component to best match the Figma was imported from shadcn/io registry. To ensure the same layout was shown during both the server-side page calls and the client-side API calls, I managed to directly match the layouts using Tailwind CSS, despite one being called from "layout.js" and the other being called from the "poke-card-layout.jsx" component. This ensured there was a seamless transition to the page being loaded, both on start-up and subsequent calls.

### Display Pokemon Images

To display the Pokemon images, I simply linked to the relevant URL's found in the initial API calls and stored in state.

### Search Functionality

To implement the search I used a "query" that was added as part of the URL, this was then sent to the components, via the main page parameters, and the API was called. The API returned a full list of all the pokemon names, which were then filtered to find only those that contained the query. These were then subsequently called for further information to display the Poke Cards of all the data.

I did not have to implement any kind of debouncing method, due to the desired Figma layout which used a "Search" button, as opposed to a more simple input. If there was further time, I would implement the search bar to continuously update a list as the user types, however this didn't seem relevant in this project.

## Self-Reflections

### I am proud of:

- Saving the query in the URL to ensure that when you select "Return Home", the query is saved in case the user wants to view other Pokemon from the same search.
- I am very happy with how accurate I got the styling to the Figma design. I spent a long time making it as accurate as possible and I believe I was very successful.
- Having the loading screens with the spinner match up identically with one another for the primary server-side render of the page and then the subsequent API call was particularly satisfying.

The key thing I am most proud of is developing an understanding of Next.js. I was initially baffled by client/server components and the conventions on using as few client components as possible etc. However, I now feel very confident in developing further websites using Next and I am very pleased with that.

### If I had more time I would:

- Add error handling for ALL API calls
- Correct the layout so somehow the "pokemon" state in "poke-card-layout" was stored while looking at a specific "pokemon-details" rather than having to reload from the page number on return. This would be more efficient. I could have done this by passing the entire list of pokemon into the Pokemon Details page, however I would then have to pass this back and it would make the URL exceedingly long and seemed like a bad way of doing this.
- Add a server-side render on the first run to improve efficiency. The code is actually here to do this, my "fetch-pokemon" function actually works both server and client side, however to then pass the data into the PokeCardLayout wasn't easy to do, and didn't seem worth it given the time-frame.
- (as mentioned above) have the search bar continuously refresh a page of all the items as opposed to simply waiting for "Search" to be pressed.
- Increase compatability with different screen sizes by using more complex Tailwind CSS to account for the layouts.

### Errors that I am aware of:

- If you search and there are more than 12 results, it will show all of the results on a single page
- The pokemon weaknesses do not match those in the Figma. This is because I had to select the weaknesses based on a singular type rather than multiple, as each type has it's own list of weaknesses in the API. Perhaps there was some data in the API calls that I missed to find the correct weaknesses, however I wanted to move onto other aspects (such as search/loading indicators) and ran out of time to correct it.
- (as mentioned above) The descriptions do not match those in the Figma - again as I could not find the correct one on the API.

## AI Usage

I wanted to add this small section to discuss my personal usage of AI throughout the development process.

I have intentionally not used AI to generate large sections of code, to ensure I personally have a deep understanding of how the website works. Having not used the Next.js framework before, it was important to me I learnt as much as I could. Therefore, I have only used AI to do basic bug-fixes (< 3 lines of code) or to explain difficult concepts when I couldn't find relevant answers online.

## Questions

I had a few personal questions about Next JS conventions that I couldn't find answers to online. Since this is my first time using it, I was hoping you may be able to address them for me:

- Where does the "/pages" folder become useful? I have seen it referenced in a lot of documentation, however I was under the impression all routing is done through the file structure and I have not seen it used in any tutorials.

- I read that SSR is only really used in places where the content is continuously changing or there are sensitive API calls to be made. Excluding the latter, how is it more efficient to use SSR where content needs to be continuously updated as compared to making a client side API call?
  TODO DOUBLE CHECK THIS QUESTION
