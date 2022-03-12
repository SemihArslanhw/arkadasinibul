
import React from 'react'
import GoogleMaps from '../components/hompage/GoogleMap/GoogleMap'
import HomeBodyFriends from '../components/hompage/HomeBodyFriends/HomeBodyFriends'
import "./HomePage.css"

function Homepage() {
  return (
    <div className='home-page'>
     
      <div className='home-body'>
      <GoogleMaps/>
      <HomeBodyFriends/>
      </div>
    </div>
  )
}

export default Homepage