import React, { useEffect, useState } from 'react'
import { fetchDataFromAPI } from '../utils/api'

function useFetch(url) {

    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(null)
    const [error, setError] = useState(null)

    useEffect ( () => {
        setLoading("loading...");
        setData(null)
        setError(null)

        fetchDataFromAPI(url)
        .then( (res) => {
            setLoading(false)
            setData(res)
        })
        .catch( (err) => {
            setLoading(false)
            setData("Something went wrong!")
        })
    } , [url])

  return {data, loading, error}
}

export default useFetch