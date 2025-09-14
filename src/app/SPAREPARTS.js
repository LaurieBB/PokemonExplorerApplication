
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