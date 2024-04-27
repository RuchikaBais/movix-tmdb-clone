import React from 'react'
import HeroSection from '../home/heroSection/HeroSection'
import Trending from './trending/Trending'
import Popular from './popular/Popular'
import TopRated from './topRated/TopRated'

function Home() {

  return (
    <div>
      <HeroSection />
      <Trending />
      <Popular />
      <TopRated />
    </div>
  )
}

export default Home