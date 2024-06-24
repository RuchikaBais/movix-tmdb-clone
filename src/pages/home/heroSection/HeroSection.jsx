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
    const alertShown = localStorage.getItem('alertShown');

    if (!alertShown) {
      alert(`This application uses The Movie Database (TMDb) API for data fetching. Please note that the content may be inaccessible on Jio networks due to restrictions; using a different network or VPN is recommended.`);
      localStorage.setItem('alertShown', 'true');
    }
    
    const handleBeforeUnload = () => {
      localStorage.removeItem('alertShown');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    const bg = url?.backdrop ? (url?.backdrop + data?.results[Math.floor(Math.random() * 20)]?.backdrop_path) : bg2;
    setbackground(bg);
  }, [data])

  const searchQueryHandler = (e) => {
    console.log(e)

    if ((e.key === 'Enter' || e.target.tagName === 'BUTTON' ) && query.length > 0) {
      navigate(`/search/${query}`)
    }
  }

  return (
    <div className="heroSection">

      {!loading &&
        <div className="backdrop-img">
          <Img src={background} />
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
            <button onClick={searchQueryHandler}>Search</button>
          </div>
        </div>
      </ContentWrapper>

    </div>

  )
}

export default HeroSection