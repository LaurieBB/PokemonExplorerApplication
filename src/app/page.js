import FetchPokemon from "../api/fetch-pokemon";

import {redirect} from 'next/navigation'

export default async function Home() {
  // Link to the landing page 
  redirect('/0')
}


