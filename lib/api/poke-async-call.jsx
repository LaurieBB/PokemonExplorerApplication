import React from "react";
import { useState } from "react";
// import { createRoot } from 'react-dom/client';
import PokeCard from "@components/features/poke-card";

// I APPARENTLY CANNOT DEFINE HOOKS IN HERE BECAUSE IT IS NOT A CLIENT, I DO NOT UNDERSTAND THE CORRECT FILE FORMAT FOR DEFINING HOOKS/API CALLS.
// ERROR WITH useState HERE

export default async function LoadPoke() {
    const data = await fetch("https://pokeapi.co/api/v2/pokemon")
    const posts = await data.json()

    const [pokemon, setPokemon] = useState(posts.results)
    const [nextPokemonURL, setNextPokemonURL] = useState(posts.next)
    const [prevPokemonURL, setPrevPokemonURL] = useState(posts.prev)

    return (
        <ul>
            {posts.results.map((post) => (
                <li key={post.id}><PokeCard name={post.name}></PokeCard></li>
            ))}
            {JSON.stringify(posts)}
        </ul>
    )

}

// createRoot(document.getElementById('root').render(
//     <LoadPoke></LoadPoke>
// ))