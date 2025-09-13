import { Separator } from "@components/ui/separator"

// Footer section for all pages

// TODO move the separator up and position to stretch the length of the screen

export default function Footer() {
    return (
        <footer>
            <Separator></Separator> 
            <p className="footer-1"><b>Thank you for using Pokémon Browser!</b></p>
        </footer>
    )
}