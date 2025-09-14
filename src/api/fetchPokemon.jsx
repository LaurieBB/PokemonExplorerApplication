"use client"

import { getPokeAPI } from "./getPokeAPI";
import React from "react";
import { useState, useEffect } from "react";

import PokeLayout from "../components/features/poke-layout";

export default function FetchPokemon() {
    const [pokemon, setPokemon] = useState(null)
    const [data, setData] = useState(null)
    const [currentURL, setCurrentURL] = useState("https://pokeapi.co/api/v2/pokemon/")
    const [nextURL, setNextURL] = useState(null)
    const [prevURL, setPrevURL] = useState(null)

    // This takes the basic information of the pokemon, plus their names and the next and previous URLs to get more pokemon from the API  
    useEffect(() => {
        getPokeAPI(currentURL, "")
        .then(setData);
    }, [currentURL]);


    // Takes the rest of the information for each pokemon that was retrieved from the API above. 
    useEffect(() => {
        if (!data) return; 
        setNextURL(data.next)
        setPrevURL(data.previous)

        const fetchAllPoke = async () => {
            try {
                // This line is used to retrieve the individual pokemon information fromt the API
                const promises = data.results.map((poke, id) => getPokeAPI("https://pokeapi.co/api/v2/pokemon/", id+1 + "/"));
                const pokemonData = await Promise.all(promises); 
                setPokemon(pokemonData);
            } catch (error) {
                console.error("Error fetching Pokémon:", error);
            }
        };
        fetchAllPoke();
    }, [data]);

    if (!data) {
        return <p>Loading...</p> //ADD SPINNER HERE
    }

    if (!pokemon) {
        return <p> Loading...</p> //ADD SPINNER HERE
    }

    return (<PokeLayout name={pokemon[0].name}></PokeLayout>); // START HERE AND FIND A WAY TO PASS DATA CORRECTLY TO POKE-LAYOUT
}
