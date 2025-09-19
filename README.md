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

I chose to make seperate components for the header, footer, pagination and search bar as these are re-used throughout multiple pages and I have attempted to follow the principle of smallest possible components throughout. These can all be found in the "src/components/layout" folder.

My larger components are stored in "src/components/features" which make up the main body of both the Landing Page and the Pokemon Details page. The landing page consists of a client component "/poke-card-layout.jsx" which makes the API calls by calling the "src/api/fetch-pokemon.jsx" function and then iterately calls the "/poke-card.jsx" component to show the information found. The "PokeCardLayout" function also handles the State for the landing page. I did this to attempt to have the smallest client component I could, to follow Next.js best practices.

If I had more time, I would have taken the "poke-desc-layout" component that holds the Pokemon Details page data and split it into smaller components. This would better fit with Next.js conventions and would be very easy to do, I just simply ran out of time.

### shadcn/ui Components

All shadcn/ui components are in "src/components/ui".

The first thing I did to start this project was read through the shadcn/UI docs as I had not previously used this package. On looking through the components I noticed the similarities to the Figma design. Therefore, I actively matched different parts of the Figma design to the different components before even beginning to code. These are shown here:

- Pokemon Type: _Badge_
- Pagiation: _Buttons_
- Search Bar: _Input + Button_
- Pokemon Sections (Both on Landing Page and Details Page): _Card_
- Pokemon Stats Details: _Progress_
- Horizontal lines: _Separators_

These were all suitable, simply because they perfectly matched the Figma as well as making organising the data very easy and understandable for the user.

### Interpretations/Deviations

The only deviations from the Figma was due to a lack of data in the API calls:

- There were more weaknesses than anticipated (for the Bulbasaur example at least), for reasons I will discuss below. To account for the greater numbers, they had to be arranged as a grid, however I left the desired list format commented out above this line, so it can easily be reinstated later when the bug is resolved.

- Bulbasaur's description could not be found within the list of descriptions for that Pokemon on the API.

## State Management Approach

State is almost exclusively held in the "poke-card-layout.jsx" component, as this holds the pagination, search bar and the list of pokemon. The Pokemon list is updated on every new page and the page number is updated when page changes.

There is a small quirk with the way I have handled the page number I thought important to mention. It is stored in state but when I need to see the details of a specific pokemon I must know which page to return to. It is therefore passed as a "callbackPage" variable sent in the URL. To then return to the correct page, the "Return Home" button in the details page simply routes to "/{callbackPage}" which, due to the folder layout of "app/[page]", passes the page number as a prop. This is only a quirk because this URL doesn't update with the page number state while simply using pagination, as to do so would require a full server-side refresh and would be inefficient. Therefore, the URL is only updated when the details page loads.

The "poke-desc-layout.jsx", which holds the details about the pokemon, handles it's own state of the pokemon data, which is only updated on selection.

All the state is handled through "useState". I seriously considered using the Context API, especially for the search query so I could pass it back to the parent components. I ended up finding that using react's "useSearchParams" and adding the query to the URL enabled easier updating of the key states, as well as enabling re-direction back to the same search query after viewing individual Pokemon details. This means the user doesn't lose their search just by selecting a pokemon, and is a feature I am proud of.

## API Interactions Strategy

All my API calls are made through components in the "src/api" folder. I have a simple helper function called "get-poke-api.jsx" which is called by the other functions to make all the connections. The other functions within this file handle collecting the relevant information for each section:

- Landing Page - "fetch-pokemon.jsx"
- Details Page - "fetch-pokemon-details.jsx"
- Search - "search-pokemon.jsx"

Since each of these functionalities require different information to be taken from the API I felt it best for each to be handled in their own function. I also chose to use helper functions as they can be called both server and client-side as opposed to custom hooks, for example.

This reasoning was important to me because I originally read in the Next.js docs that SSR should be used for "frequently updated data fetched from and external API". However, after implementing this I realised that the load-times were very slow and that state wasn't being handled correctly in this configuration. Therefore, I switched to client-side rendering which enabled more dynamic movement between the pages and better interactivity. It noticably improved load times and the overall experience.

I am still aware that for the initial page load SSR is more efficient, and if I had more time I would go back and load the initial pokemon list this way. It should be easy using my functions, as I could simply load the list in the page and then pass it as props to the "poke-card-layout.jsx" component.

## Challenges Encountered

### Search Functionality

Handling passing data between components was a big challenge, with search being the hardest of them. As discussed above, I considered different ways of doing this and made attempts at using Context and prop drilling, but it was not successful. I then went back to the documentation and found a Next.js tutorial on implementing a search bar. I adapted this to my context, by using a form and "handleSubmit" as opposed to updating the search each time the input changed which would require debouncing. I then also had to pass the results through the "page.jsx" parameters (as it added to the URL using "useSearchParams") and into a client component so it could handle the new state and call the API. This was challenging because it was a combination of so many different aspects of Next.js, from client/server component issues to state management for the API call. The search bar was one of the last features that I implemented, so I was very grateful to myself for having spent time developing an understanding of how Next.js uses components and state in the other aspects of this project prior to this.

### Following Next best practices

Having never used Next.js before, trying to find and follow the best practices were by far the biggest challenge in this project. The file structure was confusing due to different documentation and tutorials saying contradictory information about "/pages" and other routing methods. Client and server components also stumped me for the first 3 days of this project, as I had read that you should only use client components where absolutely necessary and so attempted to use them nowhere! Obviously now, this seems ridiculous but I did find it very confusing. To solve this, after spending a few days making a simple layout, I went back to absolute basics and watched multiple hour-long Next.js tutorials on Youtube. This gave me more real-world practical applications than the documentation did and set me on the right path.

## Bonus Features

### Loading state indicators

The "Spinner" component to best match the Figma was imported from shadcn/io registry. To ensure the same layout was shown during both the server-side page rendering and the client-side API calls, I managed to directly match the layouts using Tailwind CSS, despite one being called from "layout.js" and the other being called from the "poke-card-layout.jsx" component. This ensured there was a seamless transition to the page being loaded, both on start-up and subsequent calls.

### Display Pokemon Images

To display the Pokemon images, I simply linked to the relevant URL's found in the initial API calls and stored in state.

### Search Functionality

To implement the search I used a "query" that was added as part of the URL, this was then sent to the components, via the main page parameters, and the API was called. The API returned a full list of all the pokemon names, which were then filtered to find only those that contained the query. These were then subsequently called for further information to display the Poke Cards of all the data.

I did not have to implement any kind of debouncing method, due to the desired Figma layout which used a "Search" button, as opposed to a more simple input. If there was further time, I would implement the search bar to continuously update a list as the user types, however this didn't seem relevant in this project.

## Self-Reflections

### I am proud of:

- Saving the query in the URL to ensure that when you select "Return Home", the search is saved in case the user wants to view other Pokemon from the same search.
- I am very happy with how accurate I got the styling to the Figma design. I spent a long time making it as accurate as possible and I believe I was very successful.
- Having the loading screens with the spinner match up identically with one another for the primary server-side render of the page and then the subsequent API call was particularly satisfying.

The key thing I am proud of is developing an understanding of Next.js. It being my first time using it, I was initially baffled by client/server components and the conventions on using as few client components as possible etc. However, I now feel very confident in developing further websites using Next and I am very pleased with that.

### Errors that I am aware of:

- If you search and there are more than 12 results, it will show all of the results on a single page
- The pokemon weaknesses do not match those in the Figma. This is because I had to select the weaknesses based on a singular type rather than multiple, as each type has it's own list of weaknesses in the API. Perhaps there was some data in the API calls that I missed to find the correct weaknesses, however I wanted to move onto other aspects (such as search/loading indicators) and ran out of time to correct it.
- The descriptions do not match those in the Figma - again as I could not find the correct one on the API.

### If I had more time I would:

- Add error handling for all API calls
- Correct the layout so somehow the "pokemon" state in "poke-card-layout" was stored while looking at a specific pokemon details rather than having to reload from the page number on return. This would be more efficient. I could have done this by passing the entire list of pokemon into the Pokemon Details page, however I would then have to pass this back and it would make the URL exceedingly long and seemed like a bad way of doing this.
- Add a server-side render on the first run to improve efficiency - as mentioned above.
- Increase compatability with different screen sizes by using more complex Tailwind CSS to account for the layouts.
- Refactor "poke-desc-layout.jsx" so it has individual components for each section of the page.

## AI Usage

I wanted to add this small section to discuss my personal usage of AI throughout the development process.

I have intentionally not used AI to generate large sections of code, to ensure I personally have a deep understanding of how the website works. Having not used the Next.js framework before, it was important to me I learnt as much as I could. Therefore, I have only used AI to do basic bug-fixes (< 3 lines of code) or to explain difficult concepts when I couldn't find relevant answers online.

## Questions

I had a few personal questions about Next JS conventions that I couldn't find answers to online. Since this is my first time using it, I was hoping you may be able to address them for me:

- Where does the "/pages" folder become useful? I have seen it referenced in a lot of documentation, however I was under the impression all routing is done through the file structure and I have not seen it used in any tutorials.

- I read that SSR is only really used for "frequently updated data fetched from and external API" or for use in authentication from a sensitive API. Excluding the latter, in what scenario is it more efficient to use SSR where content needs to be continuously updated as compared to making a client side API call?
