"use client"

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@components/ui/card"

import { Badge } from "@components/ui/badge"

import Link from 'next/link'

import {usePathname} from 'next/navigation'


// Basic card layout for each of the Pokemon in Landing Page 1+2+SearchResults

export default function PokeCard(props) { //FORMAT THE CARDS CORRECTLY HERE
    // Holds the information about the pokemon card clicked on
    const pokemon = props.pokemon

    // Transfers the page number so it can be sent back to if the card is selected
    const pageNum = props.pageNum

    // Transfers the search query so if it is selected, the query can be returned to
    const query = props.query

    // Used to format the parameters to send the callback URL so it can return to the same page.
    const params = new URLSearchParams();
    params.set("callbackPage", pageNum);      
    if (query) {
        params.set("query", query)
    };  

    return (
        <Link href={`/details/${pokemon.name}?${params.toString()}`}>
            <Card> 
                <img src={pokemon.imageURL}></img>
                <CardTitle>{pokemon.name}</CardTitle>
                <CardContent>
                    <p>{pokemon.id}</p>

                    <div>
                        {pokemon.types.map((type, index) => <Badge key={index}>{type}</Badge>)}
                    </div>
                </CardContent>
            </Card>
        </Link>
    )
}