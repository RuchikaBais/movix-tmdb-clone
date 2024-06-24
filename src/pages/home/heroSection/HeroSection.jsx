import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useFetch from '../../../hooks/useFetch';
import { useSelector } from 'react-redux';
import Img from '../../../components/lazyLoadImage/Img'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import './style.scss'
import bg2 from '../../../assets/bg2.jpg';


function HeroSection() {

  const [background, setbackground] = useState('');
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const { url } = useSelector((state) => state.home)
  const { data, loading } = useFetch("/movie/upcoming")

  useEffect(() => {
        const bg = url?.backdrop ? (url?.backdrop + data?.results[Math.floor(Math.random() * 20)]?.backdrop_path) : bg2  ;

    setbackground(bg);

  }, [data])

  const searchQueryHandler = (e) => {
    if (e.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`)
    }
  }

  return (
    <div className="heroSection">

      {!loading &&
        <div className="backdrop-img">
          <Img src={background}/>
        </div>}

        <div className="opacity-layer">

        </div>

      <ContentWrapper>
          <div className="heroSectionContent">
            <span className="title">Welcome</span>
            <span className="sub-title">Millions of movies, TV shows and people to discover.
              Explore now.</span>
            <div className="searchInput">
              <input
                type="text"
                placeholder='Search for movie or TV show...'
                onChange={(e) => setQuery(e.target.value)}
                onKeyUp={searchQueryHandler} />
              <button>Search</button>
            </div>
          </div>
      </ContentWrapper>

    </div>

  )
}

export default HeroSection