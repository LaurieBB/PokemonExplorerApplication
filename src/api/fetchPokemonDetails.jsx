"use client"


// DEPRECATED FUNCTION - NO LONGER BEING USED. CAN BE SEEN IF WANT TO UNDERSTAND MY PROCESS



import { getPokeAPI } from "./get-poke-api";
import React from "react";
import { useState, useEffect } from "react";

import PokeDetailsLayout from "../components/features/poke-desc-layout";

export default function FetchPokemonDetails(props) {
    const [pokemon, setPokemon] = useState(null)
    const [species, setSpecies] = useState(null)
    const [male, setMale] = useState(null)
    const [female, setFemale] = useState(null)
    const [genderless, setGenderless] = useState(null)
    const [currentURL, setCurrentURL] = useState("https://pokeapi.co/api/v2/pokemon/" + props.name)
    const [types, setTypes] = useState(null)


    // This takes the basic information about the pokemon, that was performed previously to display the name, code and types in the main page
    useEffect(() => {
        getPokeAPI(currentURL, "")
        .then(setPokemon);
    }, [currentURL]);


    // This is used to get the additional data from the API for the in-depth page about each pokemon. 
    useEffect(() => {
        if (!pokemon) return; 

        // This retrieves all the data, as each gender has to be individually retrieved from a list and then searched to see if the pokemon is present.
        // Additionally, each type must be retrieved to find it's weakness
        Promise.all([
            getPokeAPI(pokemon.species.url, ""),
            getPokeAPI("https://pokeapi.co/api/v2/gender/","female/"),
            getPokeAPI("https://pokeapi.co/api/v2/gender/","male/"),
            getPokeAPI("https://pokeapi.co/api/v2/gender/","genderless/"),
            Promise.all(pokemon.types.map((typeDesc) => getPokeAPI(typeDesc.type.url, "")))
        ]).then((data) => {
            setSpecies(data[0])
            setFemale(data[1].pokemon_species_details.find(item => item.pokemon_species.name == props.name))
            setMale(data[2].pokemon_species_details.find(item => item.pokemon_species.name == props.name))
            setGenderless(data[3].pokemon_species_details.find(item => item.pokemon_species.name == props.name))
            setTypes(data[4])
        })
    }, [pokemon]);

    if (!pokemon) {
        return <p>Loading...</p> 
    }

    if (!species) {
        return <p>Loading...</p>
    }

    // It is important to note the exact description on Figma doesn't exist in the PokeAPI, so I used the first description available from Pokemon Red
    // Print species.flavor_text_entries to see and can search "nutrients" to see it doesn't exist. 
    const description = species.flavor_text_entries[0].flavor_text
    const category = species.genera.find(item => item.language.name == "en").genus

    const weaknesses = types.map((data) => data.damage_relations.double_damage_from.map((item) => item.name))

    return (
        <div>
            <p>{JSON.stringify(category)}</p>
            <p>{JSON.stringify(description)}</p>
            <p>{JSON.stringify(male)}</p>
            <p>{JSON.stringify(female)}</p>
            <p>{JSON.stringify(genderless)}</p>
            <p>{JSON.stringify(weaknesses)}</p>
            {/* <PokeDetailsLayout></PokeDetailsLayout> */}
            {/* <p>{JSON.stringify(pokemon.types)}</p> */}
            {/* <p>{JSON.stringify(types)}</p> */}
        </div>
    );

    return { description, category, male, female, genderless }
}

    // HAVE TO CALL API THROUGH THE ".species" to get the "flavour-text-entires" which then give the description
    // This also has a "genera" list which contains "genus" and "language" so have to ensure the genus is correct for the english language ("en")

    // To find Gender you must go through this link: https://pokeapi.co/api/v2/gender/female/, this link https://pokeapi.co/api/v2/gender/male/, this link https://pokeapi.co/api/v2/gender/genderless/
    // and search for the pokemon name. Really stupid but i guess it is what it is

    // This is the cherish ball png that is used next to the poke description "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/cherish-ball.png"

    // To get weaknesses you have to use the "types" URLs and make a successive call to each type in that list and look for "double-damage" (double check)
