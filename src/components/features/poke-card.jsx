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
    return (
        <Link href={`/details/${props.name}`}>
        {/* <Link href={`/details`}> */}
            <Card> 
                <img src={props.imgURL}></img>
                <CardTitle>{props.name}</CardTitle>
                <CardContent>
                    <p>{props.num}</p>

                    <div>
                        {props.types.map((type, index) => <Badge key={index}>{type}</Badge>)}
                    </div>
                </CardContent>
            </Card>
        </Link>
    )
}