import React, { useContext, useEffect } from 'react'
import "./GoogleMap.css"
import Geocode from 'react-geocode';
import { GoogleMap, DistanceMatrixService , InfoBox, InfoWindow, Marker, useJsApiLoader, DirectionsRenderer } from '@react-google-maps/api';
import MapStyles from '../../../MapStyles';
import { AuthContext } from '../../../context/AuthContext';



function GoogleMaps({userDatas}) {
  const [currentPosition , setCurrentPosition] = React.useState({lat: 0, lng: 0});
  const [markers , setMarkers] = React.useState([]);
  const [selectedPin , setSelectedPin] = React.useState();
  const [map, setMap] = React.useState(null)
  const [directions , setDirections] = React.useState({});
  const [destinationAddress , setDestinationAddress] = React.useState();
  const [time , setTime] = React.useState(null);
  const [distance , setDistance] = React.useState(null);
  const mapRef = React.useRef();
  
  var directionApi ;
  var directionRender ;

  const {user} = useContext(AuthContext);



  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyCzwQwF0jxTtfQnrUMWvQZqfgVNLwPSW54"
  })

  const containerStyle = {
    width: '100vw',
    height: '80vh',
  };
  
  

  const options = {
    styles: MapStyles,
    disableDefaultUI: true,
    zoomControl: true,
    
  };

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(30);
  }, []);

  

  

  

  const onLoad = React.useCallback(function callback(map) {
    mapRef.current = map;
    
    map.panTo({ lat: user.lat, lng: user.lng });
    
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return (<div className='google-map'>{isLoaded ? (
    <div>
     
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{lat: user.lat , lng: user.lng}}
        zoom={40}
        options={options}
        onLoad={onLoad}
        onUnmount={onUnmount}
       
      >
        { /* Child components, such as markers, info windows, etc. */ }
      
      
         
        
        {userDatas?.map((data, index) => (
          <Marker
          
          key={index}
          position={{
            lat: data.lat,
            lng: data.lng,
          }}
          icon={{
            url: data?.profilePicture,
            scaledSize: new window.google.maps.Size(50, 50),
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(15, 15)
           }} 
        />
        ))}
           <Marker  
           icon={{
            url: user?.profilePicture,
            scaledSize: new window.google.maps.Size(50, 50),
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(15, 15)
           }} 
           position={{ lat: user.lat, lng: user.lng }}
           onClick={()=>{panTo({lat: user.lat, lng: user.lng})}}
           />   
           
           
      </GoogleMap></div>
  ) : <>Harita Yükleniyor...</>}</div>)
}

export default GoogleMaps