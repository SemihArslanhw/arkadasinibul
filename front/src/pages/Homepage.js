
import React, { useContext, useEffect } from 'react'
import GoogleMaps from '../components/hompage/GoogleMap/GoogleMap'
import HomeBodyFriends from '../components/hompage/HomeBodyFriends/HomeBodyFriends'
import { AuthContext } from '../context/AuthContext'
import { API } from '../context/BaseAxiosCall'
import "./HomePage.css"

function Homepage() {
  const [usersData , setUsersData] = React.useState([]);
  const {user} = useContext(AuthContext);
  useEffect(() => {
   API.get("/users/city/"+user.city).then(res => {
      setUsersData(res.data)
    })
  }, [])
  return (
    <div className='home-page'>
     
      <div className='home-body'>
      <GoogleMaps userDatas={usersData}/>
      <HomeBodyFriends usersDatas={usersData}/>
      </div>
    </div>
  )
}

export default Homepage