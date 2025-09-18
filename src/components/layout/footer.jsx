import { Separator } from "@components/ui/separator"

// Footer section for all pages

export default function Footer() {
    return (
        <footer className="flex flex-col items-center text-center w-full">
            <Separator className="w-full"></Separator> 
            <p className="mt-30"><b>Thank you for using Pokémon Browser!</b></p>
        </footer>
    )
}