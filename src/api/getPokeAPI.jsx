export const getPokeAPI = async (BASE_API, suffix) => {
    const response = await fetch(BASE_API + suffix);  
    const data = await response.json();

    return data;
}

// Custom hook to retrive any Poke API data that is needed, as well as show if it is loading. 

// import React from "react";
// import { useState, useEffect } from "react";

// export const getPokeAPI = (BASE_API, suffix) => {
//     const [data, setData] = useState(null);

//     useEffect(() => {
//         async function fetchPokeData() {
//             const response = await fetch(BASE_API + suffix)
//             const responseData = await response.json()
            
//             setData(responseData)
//         }
//         fetchPokeData()
//     });


//     return data;
// }
