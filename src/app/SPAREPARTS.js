
  const [pokemon, setPokemon] = useState(posts.results)
  const [nextURL, setnextURL] = useState(posts.next)
  const [prevURL, setprevURL] = useState(posts.prev)


        <ul>
              {pokemon.map((post) => (
                  <li key={post.id}><PokeCard name={post.name}></PokeCard></li>
              ))}
              {JSON.stringify(posts)}
          </ul>


import { useState } from "react";
import { createRoot } from 'react-dom/client';



export function LoadPoke({ pokeList }) {
    const arr = []
    

    useEffect(() => {
        async function fetchPokeData(props) {
            const response = await fetch(props.url)
            const data = await response.json();
            arr.push(data)
        }
    });

    return (
        {pokeList.map((poke) => (
            fetchPokeData(poke)
        ))}
    );
}


async function fetchData(props) {
    const response = await fetch(props.url);  
    // const response = await fetch("https://pokeapi.co/api/v2/pokemon/1/");  
    const data = await response.json();

    return data
}



const getData = async () => {
        setLoading(true);

        try {
            const dataFetch = await fetch(BASE_API + suffix)

            if (dataFetch.status == "200") {
                setData(dataFetch.data)
                setLoading(false)
            }

            else {
                setError("There was an error.")
            }
        } catch (error) {
            setError(error);

            throw console.error(error)
        }
        
    }

useEffect(() => {
         setLoading(true);

        try {
            const dataFetch = fetch(BASE_API + suffix)

            if (dataFetch.status == "200") {
                setData(dataFetch.data)
                setLoading(false)
            }

            else {
                setError("There was an error.")
            }
        } catch (error) {
            setError(error);

            throw console.error(error)
        }
        
    })


      const handleClick = () => {
        useEffect(() => {
            if (!search) return; 
    
            // This fetches all of the available pokemon and their information
            const fetchAllPoke = async () => {
                try {
                    const allPoke = getPokeAPI("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=100000", "") // Just set a ridiculous number here to return everything
                    setPokemon(allPoke);
                } catch (error) {
                    console.error("Error fetching Pokémon:", error);
                }
            };
            fetchAllPoke();
    
            // Search the list of all the names to find any matches 
            const pokeNames = pokemon.map((poke) => poke.name)
            const matchPoke = pokeNames.find(search)
    
            console.log(matchPoke)
    
            // Take the full information to display the PokeCards 
    
        }, [search]);
        console.log("Input value:", search)
      }
    

      // There are two important things to note: Regular pokemon just go up to id #1025, whereas special pokemon start at #10000 and go up to #10277. Therefore, this needs to be accounted for if searching by ID
"use client"

import React from "react"
import { Button } from "@components/ui/button"
import { Input } from "@components/ui/input"
import { useState, useEffect } from "react"

import { getPokeAPI } from "@/src/api/get-poke-api";

export default function Search() {
    const [search, setSearch] = useState(null)
    const [pokemon, setPokemon] = useState("null")

    const handleClick = async () => {
        if (!search) return; 

        // This fetches all of the available pokemon and their information
        try {
            await getPokeAPI("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=100000", "").then(setPokemon) // Just set a ridiculous number here to return everything
        } catch (error) {
            console.error("Error fetching Pokémon:", error);
        }

        if (!pokemon) {
            console.log("Loading..")
            return;
        }

        // Search the list of all the names to find any matches 
        const pokeNames = pokemon.results.map((poke) => poke.name)
        const matchPoke = pokeNames.find(name => name == search)

        console.log(matchPoke)

        // Take the full information to display the PokeCards 

        console.log("Input value:", search)
    }

    return (
        <div>
        <Input
            type="text"
            placeholder="Find Pokémon"
            onChange={(e) => setSearch(e.target.value)}
        />
        <Button onClick={handleClick}>Search</Button>
        </div>
    )
}

    // var pathname = usePathname()

    // if (pathname == '/') {
    //     pathname = '/0'
    // }

    // pathname = pathname.replace('/', '')

    // const clickNext = () => {
    //     window.location.href=`/${Number(pathname) + 1}`
    // }

    // const clickBack = () => {
    //     if (pathname > 0) {
    //         window.location.href=`/${Number(pathname) - 1}`
    //     }
    // }
