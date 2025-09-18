"use client"

import { Button } from "@components/ui/button"

import React from "react";

// The Buttons used to scroll through the pages of the Pokemon

// TODO HAVE TO GREY OUT AND NOT ALLOW CLICK WHEN PAGE IS 0 

export default function Pagination(props) {
    // The functions are declared in "poke-card-layout" so that it will edit the page state stored there. s
    const clickNext = props.clickNext
    const clickBack = props.clickBack
    const disableBack = props.disableBack
    const disableNext = props.disableNext

    return (
        <div className="flex gap-3">
            <Button 
            onClick={clickBack}
            disabled={disableBack}
            className={disableBack ? "bg-neutral-500" : ""}
            >&#129120; Back</Button>

            <Button 
            disabled={disableNext}
            className={disableNext ? "bg-neutral-500" : ""}
            onClick={clickNext}>Next &#129122; </Button>
        </div>
    )
}