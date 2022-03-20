import React, { useEffect } from 'react'
import "./GoogleMap.css"
import Geocode from 'react-geocode';
import { GoogleMap, DistanceMatrixService , InfoBox, InfoWindow, Marker, useJsApiLoader, DirectionsRenderer } from '@react-google-maps/api';
import MapStyles from '../../../MapStyles';



function GoogleMaps() {
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


  Geocode.setApiKey("AIzaSyA9MQjXLBeS7B6BaPz3zj0urSt2rt3uCXY");
  Geocode.enableDebug();
  
  

  useEffect(()=>{
    

   navigator.geolocation.getCurrentPosition(function(position) {
    setCurrentPosition({
      lat: position.coords.latitude,
      lng: position.coords.longitude
    });
    console.log(position)
  });
  },[])

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyCzwQwF0jxTtfQnrUMWvQZqfgVNLwPSW54"
  })

  const containerStyle = {
    width: '50wh',
    height: '600px'
  };
  
  

  const options = {
    styles: MapStyles,
    disableDefaultUI: true,
    zoomControl: true,
    
  };

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  

  const setDestination = (destination) => {
    console.log(destination)
    directionApi = new window.google.maps.DirectionsService();
    directionApi.route({
      origin: {lat: currentPosition.lat, lng: currentPosition.lng},
      destination: {lat: destination.latLng.lat(), lng: destination.latLng.lng()},
      travelMode: 'DRIVING'
    }, (result, status) => {
      if (status === 'OK') {
        setDistance(result.routes[0].legs[0].distance.text)
        setTime(result.routes[0].legs[0].duration.text)
        Geocode.fromLatLng(destination.latLng.lat(), destination.latLng.lng()).then(
          response => {
            const address = response.results[0].formatted_address;
            setDestinationAddress(address)
          })
        setDirections(result);
      } else {
        console.log('Error: ' + status);
      }
    });
   }

  const getLocation = (e) =>{
    Geocode.fromLatLng(e.latLng.lat(), e.latLng.lng()).then(
      response => {
        const address = response.results[0].formatted_address;
        console.log(address)
      }
    )

  }

  const onLoad = React.useCallback(function callback(map) {
    mapRef.current = map;
    
    navigator?.geolocation?.getCurrentPosition(function(position) {
      map.panTo({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      });
    });
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onMapClick = React.useCallback((e) => {
   

    setMarkers((current) => [
      ...current,
      {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
        time: new Date(),
      },
    ]);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return (<div className='google-map'>{isLoaded ? (
    <div>
     {distance && <div className='distance'>
       <p>{distance}</p>
       <p>Tahmini Varış Süresi : {time}</p>
       <p>Gidilmek İstenen Nokta : {destinationAddress}</p>
       </div>}
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={currentPosition}
        zoom={48}
        options={options}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={(event) => onMapClick(event)}
      >
        { /* Child components, such as markers, info windows, etc. */ }
       {directions && <DirectionsRenderer directions={directions} options={{suppressMarkers: true}}/>}
      
         
        
        {markers?.map((marker, index) => (
          <Marker
          opacity={0.5} 
          draggable={true}
          onDragEnd={(event) => {
            setMarkers((current) => [
              ...current.slice(0, index),
              {
                ...marker,
                lat: event.latLng.lat(),
                lng: event.latLng.lng(),
              },
              ...current.slice(index + 1),
            ]);
          }}
          key={index}
          position={{
            lat: marker.lat,
            lng: marker.lng,
          }}
          onClick={(e) => {
            setDestination(e)
          }}
        />
        ))}
           <Marker  icon={{
            url: "Character.png",
            scaledSize: new window.google.maps.Size(50, 50),
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(15, 15)
           }} onClick={(event)=>{console.log(event);getLocation(event)}} position={{ lat: currentPosition.lat, lng: currentPosition.lng }} />   
           
           
      </GoogleMap></div>
  ) : <>Harita Yükleniyor...</>}</div>)
}

export default GoogleMaps