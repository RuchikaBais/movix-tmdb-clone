import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3"
const TMDB_TOKEN = import.meta.env.VITE_APP_TMDB_TOKEN;
// const API_KEY = "61b0e38d924fe3358005cad49a80f557"
// const TMDB_TOKEN  = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MWIwZTM4ZDkyNGZlMzM1ODAwNWNhZDQ5YTgwZjU1NyIsInN1YiI6IjY1MmU0OTdjMGNiMzM1MTZmZWM5NjRhMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SCGj6vozLi8Floz-l9rQAU-yy-pNRIr9b_r5FVKDbp8"

const headers = {
    Authorization: "bearer " + TMDB_TOKEN,
}

export const fetchDataFromAPI = async (url, params) => {
    try{
        const {data} = await axios.get(BASE_URL + url  , {
            headers,
            params
        } )
        return data;
    } catch(err){
        console.log(err)
        return err;
    }
}