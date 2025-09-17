import FetchPokemon from "../api/fetch-pokemon";

import {redirect} from 'next/navigation'

// I could add a server-side render here of the initial page of pokemon to improve efficiency, however passing to the other page is hard
// TODO

export default async function Home() {
  // Link to the landing page 
  redirect('/0')
}


