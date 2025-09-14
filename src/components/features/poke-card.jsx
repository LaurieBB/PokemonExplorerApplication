import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@components/ui/card"

// Basic card layout for each of the Pokemon in Landing Page 1+2+SearchResults

export default function PokeCard(props) { //FORMAT THE CARDS CORRECTLY HERE
    return (
        <div>
            <Card> 
                <CardTitle>{props.name}</CardTitle>
            </Card>
        </div>
    )
}