import { Button } from "@components/ui/button"

// The basic page change buttons for the bottom of each page. 

// Need to add functionality as well as the fact the arrows there are slightly different to the Figma Design 

export default function Pagination() {
    return (
        <div>
            <Button>&#129120; Back</Button>
            <Button>Next &#129122;</Button>
        </div>
    )
}