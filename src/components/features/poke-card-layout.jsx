"use client"

import React from "react";
import { useState, useEffect } from "react"

import PokeCard from "./poke-card";

import Search from "@components/layout/search"
import Pagination from "@components/layout/pagination";

import FetchPokemon from "@api/fetch-pokemon"
import SearchPokemon from "@/src/api/search-pokemon";

import { Spinner } from "@components/ui/shadcn-io/spinner/index"

// This function is used to return the list of pokemon, the loading spinner, the search bar and the pagination buttons for the page.
// It also holds the state information shown below.

// State Information:
    //"pokemon" layout - A List of pokemon containing:
    //      id: pokemon.id - ID Integer
    //      name: pokemon.name - Name String
    //      imageURL: pokemon.sprites.front_default - Sprite URL
    //      types: pokemon.types - List of types

    // "pageNum" is the current page number, used to fetch the correct pokemon from the API in "FetchPokemon"

export default function PokeCardLayout(props) { 
    const [pageNum, setPageNum] = useState(Number(props.page) || 0)
    const [pokemon, setPokemon] = useState(null)
    
    // query is sent to this layout if there is any data in the Search bar, which is echoed in the URL and then passed down from the page
    const query = props.query 

    if (query) {
        useEffect(() => {
            SearchPokemon(query).then(setPokemon) // TODO, Current error is that if this returns too many pokemon, they are displayed as one big list. 
        })
    }
    else {
        useEffect(() => {
            FetchPokemon(pageNum).then(setPokemon)
        })
    }

    if (!pokemon) {
        return (
            <Spinner variant="circle"></Spinner>
        ) 
    }

    return (
        <div>
            <h2>Explore Pokemon</h2>
            <Search></Search>
            {pokemon.map(function(poke) { 
                return(
                    <div key={poke.id}>
                        <PokeCard key={poke.id} pokemon={poke} pageNum={pageNum} query={query}></PokeCard> 
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

