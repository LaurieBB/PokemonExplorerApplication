"use client"


// DEPRECATED FUNCTION - NO LONGER BEING USED. CAN BE SEEN IF WANT TO UNDERSTAND MY PROCESS


import { getPokeAPI } from "./get-poke-api";
import React from "react";
import { useState, useEffect } from "react";

import PokeCardLayout from "../components/features/poke-card-layout";

export default function FetchPokemon() {
    const [pokemon, setPokemon] = useState(null)
    const [data, setData] = useState(null)
    const [pageNum, setPageNum] = useState(0) // Should be updated on Pagination and cause new pokemon to be returned
    const [currentURL, setCurrentURL] = useState("https://pokeapi.co/api/v2/pokemon/?offset=" + (pageNum * 12) + "&limit=12")

    // This takes the basic information of the pokemon, plus their names and the next and previous URLs to get more pokemon from the API  
    useEffect(() => {
        getPokeAPI(currentURL, "")
        .then(setData);
    }, [pageNum]);


    // TODO CHANGE - Put this in a seperate component and call multiple of the same component and remove the Promise()
    // Takes the rest of the information for each pokemon that was retrieved from the API above. 
    useEffect(() => {
        if (!data) return; 

        const fetchAllPoke = async () => {
            try {
                // This line is used to retrieve the individual pokemon information fromt the API
                const promises = data.results.map((poke, id) => (getPokeAPI("https://pokeapi.co/api/v2/pokemon/", id+1 + "/")));
                const pokemonData = await Promise.all(promises); 
                setPokemon(pokemonData);
            } catch (error) {
                console.error("Error fetching Pokémon:", error);
            }
        };
        fetchAllPoke();
    }, [data]);

    if (!data) {
        return <p>Loading...</p> 
    }

    if (!pokemon) {
        return <p> Loading...</p> 
    }

    return (
        <div>
            <PokeCardLayout pokeInfo={pokemon}></PokeCardLayout>
            {/* <p>{JSON.stringify(currentURL)}</p> */}
        </div>
    );
}
