import React, { useEffect, useState } from 'react'
import { fetchDataFromAPI } from './utils/api'
import { useSelector, useDispatch } from 'react-redux';
import { getApiConfigurations , getGenres } from './store/homeSlice';
import allExports from './allExports'
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {

    const dispatch = useDispatch()
    const { url } = useSelector((state) => state.home)
    console.log(url)

    useEffect(() => {
        fetchApiConfig();
        genresCall();
    }, [])

    const fetchApiConfig = () => {
        fetchDataFromAPI("/configuration")
            .then((res) => {
                console.log(res)

                const url = {
                    backdrop: res.images.secure_base_url + "original",
                    poster: res.images.secure_base_url + "original",
                    profile: res.images.secure_base_url + "original",
                }
                dispatch(getApiConfigurations(url));
            })
    }

    const genresCall = async() =>{
        let promises = []
        let endPoints = ["tv","movie"]
        let allGenres = {}

        endPoints.forEach((url)=>{
            promises.push(fetchDataFromAPI(`/genre/${url}/list`))
        })

        const data = await Promise.all(promises);
        data.map(({genres}) => {
            return genres.map((item)=> (allGenres[item.id] = item))
        })
        dispatch(getGenres(allGenres))
    }

    return (
        <BrowserRouter>
            <allExports.Header />
            <Routes>
                <Route path='/' element={<allExports.Home />} />
                <Route path='/:mediaType/:id' element={<allExports.Details />} />
                <Route path='/search/:query' element={<allExports.SearchResult />} />
                <Route path='/explore/:mediaType' element={<allExports.Explore />} />
                <Route path='*' element={<allExports.PageNotFound />} />
            </Routes>
            <allExports.Footer/>
        </BrowserRouter>
    )
}

export default App

