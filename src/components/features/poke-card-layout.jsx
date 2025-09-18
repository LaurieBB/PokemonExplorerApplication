"use client"

import React from "react";
import { useState, useEffect } from "react"

import PokeCard from "./poke-card";

import Search from "@components/layout/search"
import Pagination from "@components/layout/pagination";

import FetchPokemon from "@api/fetch-pokemon"
import SearchPokemon from "@/src/api/search-pokemon";

import { Spinner } from "@components/ui/shadcn-io/spinner/index"

import { Suspense } from "react";

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
    const [pokeCount, setPokeCount] = useState(null) // Used to hold the max number of pokemon, for pagination
    
    
    // query is sent to this layout if there is any data in the Search bar, which is echoed in the URL and then passed down from the page
    const query = props.query 

    if (query) {
        useEffect(() => {
            SearchPokemon(query).then(setPokemon) // TODO, Current error is that if this returns too many pokemon, they are displayed as one big list. 
        })
    }
    else {
        useEffect(() => {
            // Have to fetch both the pokemon and the max number of pokemon, to ensure the page number doesn't exceed the maximum number
            FetchPokemon(pageNum).then((data) => {
                setPokemon(data.pokeData)
                setPokeCount(data.pokeCount)
            }) 
        })
    }

    // While pokemon is being loaded, it shows a spinner page identical both to the server-side render page and with the same layout as the poke-card-layout page
    if (!pokemon) {
        return (
            <div className="flex flex-col w-full h-full flex-1">
                <div className="flex items-center justify-between mb-8 w-full ">
                    <h2 className="text-xl font-bold">Explore Pokémon</h2>
                    <Suspense>
                        <Search />
                    </Suspense>
                </div>
        
                <main className="flex flex-col justify-center items-center text-center flex-1 w-full ">
                    <Spinner variant="circle"></Spinner>
                </main>
        
                <div className="flex justify-center mt-8 w-full">
                <Pagination 
                    disableBack={true}
                    disableNext={true}
                />
                </div>
            </div>
        ) 
    }

    return (
        <div className="w-full h-full">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold">Explore Pokémon</h2>
                <Search />
            </div>
            <div className="grid grid-cols-4 grid-rows-3 gap-x-4 gap-y-10">
                {pokemon.map(function(poke) { 
                    return(
                        <PokeCard key={poke.id} pokemon={poke} pageNum={pageNum} query={query}></PokeCard> 
                    )})
                }
            </div>
            <div className="flex justify-center mt-8">
                <Pagination 
                clickNext={() => setPageNum(pageNum + 1)}
                clickBack={() => setPageNum(pageNum - 1)}
                disableBack={pageNum == 0}
                disableNext={pageNum == (Math.floor(Number(pokeCount)/12))}
                />
            </div>
        </div>
    )
}

