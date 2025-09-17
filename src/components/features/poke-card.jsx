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

// Basic card layout for each of the Pokemon in Landing Page 1+2+SearchResults

export default function PokeCard(props) { //FORMAT THE CARDS CORRECTLY HERE
    const pokemon = props.pokemon

    // START HERE AND WORK OUT HOW TO CORRECTLY SEND THE DATA IN "LINK" SO IT CAN BE READ BY THE PAGE.JS
    return (
        <Link href={{
            pathname:`/details/${pokemon.name}`,
            query:pokemon}}>
        {/* <Link href={`/details`}> */}
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