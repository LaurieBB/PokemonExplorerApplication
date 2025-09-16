"use client"

import { Button } from "@components/ui/button"

import React from "react";
import { useState, useEffect } from "react";

import { usePathname, useSearchParams } from 'next/navigation'

// The basic page change buttons for the bottom of each page. 

// Need to add functionality as well as the fact the arrows there are slightly different to the Figma Design 

export default function Pagination() {
    var pathname = usePathname()

    if (pathname == '/') {
        pathname = '/0'
    }

    pathname = pathname.replace('/', '')

    const clickNext = () => {
        window.location.href=`/${Number(pathname) + 1}`
    }

    const clickBack = () => {
        if (pathname > 0) {
            window.location.href=`/${Number(pathname) - 1}`
        }
    }

    return (
        <div>
            <Button onClick={clickBack}>&#129120; Back</Button>
            <Button onClick={clickNext}>Next &#129122;</Button>
        </div>
    )
}