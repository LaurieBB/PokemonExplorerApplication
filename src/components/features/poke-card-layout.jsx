"use client"

import React from "react";
import { useState, useEffect } from "react"

import PokeCard from "./poke-card";

import Search from "@components/layout/search"
import Pagination from "@components/layout/pagination";

import FetchPokemon from "@api/fetch-pokemon"

// This function is used to return the list of pokemon, the loading spinner, the search bar and the pagination buttons for the page.
// It also holds the state information shown below.

// State Information:
    //"pokemon" layout - A List of pokemon containing:
    //      id: pokemon.id - ID Integer
    //      name: pokemon.name - Name String
    //      imageURL: pokemon.sprites.front_default - Sprite URL
    //      types: pokemon.types - List of types

    // "pageNum" is the current page number, used to fetch the correct pokemon from the API in "FetchPokemon"

export default function PokeCardLayout() { 
    const [pageNum, setPageNum] = useState(0)
    const [pokemon, setPokemon] = useState(null)

    useEffect(() => {
        FetchPokemon(pageNum).then(setPokemon)
    }, [pageNum])

    if (!pokemon) {
        return <div>Loading...</div> // ADD SPINNER HERE
    }

    return (
        <div>
            <h2>Explore Pokemon</h2>
            <Search></Search>
            {pokemon.map(function(poke) { 
                return(
                    <div key={poke.id}>
                        <PokeCard key={poke.id} pokemon={poke}></PokeCard> 
                    </div>
                )})
            }
            <Pagination 
                clickNext={()=>{setPageNum(pageNum + 1)}}
                clickBack={()=>{setPageNum(pageNum - 1)}}
                />
        </div>
    )
}

