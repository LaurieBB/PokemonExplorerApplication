"use client"

import React from "react";
import { useState, useEffect } from "react"

import FetchPokemonDetails from "@api/fetch-pokemon-details"

// This is used to take the detailed Pokemon information from the API call and to arrange it in the correct format

// Pokemon details layout:
        // id: pokemon.id, 
        // name: pokemon.name,
        // imageURL: pokemon.sprites.front_default,
        // types: pokemon.types.map((pokeType) => pokeType.type.name),
        // stats: ,
        // description: pokeDataUnfiltered[0].flavor_text_entries[0].flavor_text,
        // category: (pokeDataUnfiltered[0].genera.find(item => item.language.name == "en").genus).replace("Pokémon", ""),
        // gender: - List of Booleans in the form [male, female, genderless] to show if it belongs to that class
        // weaknesses: pokeDataUnfiltered[4].flat()

export default function PokeDescLayout(props) { 
    const [pokemon, setPokemon] = useState(null)

    useEffect(() => {
        FetchPokemonDetails(props.name).then(setPokemon)
    })

    if (!pokemon) {
        return <div>Loading...</div> // ADD SPINNER HERE
    }

    return (
        <div>
            <p>{JSON.stringify(pokemon.id)}</p>
            <p>{JSON.stringify(pokemon.name)}</p> 
            <img src={pokemon.imageURL}></img>
            <img src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/cherish-ball.png"}></img>
            <p>{JSON.stringify(pokemon.types)}</p> 
            <p>{JSON.stringify(pokemon.weight)}</p> 
            <p>{JSON.stringify(pokemon.height)}</p> 
            <p>{JSON.stringify(pokemon.description)}</p> 
            <p>{JSON.stringify(pokemon.category)}</p> 
            <p>{JSON.stringify(pokemon.gender)}</p> 
            <p>{JSON.stringify(pokemon.weaknesses)}</p> 
            <p>{JSON.stringify(pokemon.abilityName)}</p> 
            <p>{JSON.stringify(pokemon.abilityDescription)}</p> 
            <p>{JSON.stringify(pokemon.stats)}</p> 

        </div>
    )
}
    // HAVE TO CALL API THROUGH THE ".species" to get the "flavour-text-entires" which then give the description
    // This also has a "genera" list which contains "genus" and "language" so have to ensure the genus is correct for the english language ("en")

    // To find Gender you must go through this link: https://pokeapi.co/api/v2/gender/female/, this link https://pokeapi.co/api/v2/gender/male/, this link https://pokeapi.co/api/v2/gender/genderless/
    // and search for the pokemon name. Really stupid but i guess it is what it is

    // This is the cherish ball png that is used next to the poke description "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/cherish-ball.png"

    // To get weaknesses you have to use the "types" URLs and make a successive call to each type in that list and look for "double-damage" (double check)
