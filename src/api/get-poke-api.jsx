export const getPokeAPI = async (BASE_API, suffix) => {
    const response = await fetch(BASE_API + suffix);  
    const data = await response.json();

    return data;
}


