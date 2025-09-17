"use client"

import { Button } from "@components/ui/button"

import React from "react";

// The Buttons used to scroll through the pages of the Pokemon

export default function Pagination(props) {
    const clickNext = props.clickNext
    const clickBack = props.clickBack

    return (
        <div>
            <Button onClick={clickBack}>&#129120; Back</Button>
            <Button onClick={clickNext}>Next &#129122; </Button>
        </div>
    )
}