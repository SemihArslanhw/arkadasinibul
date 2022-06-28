import React, { useEffect, useRef, useState } from 'react'
import Geocode from 'react-geocode';
import Autocomplete from "react-google-autocomplete"
import MapStyles from '../../../../MapStyles';
import { GoogleMap, StandaloneSearchBox , InfoBox, Marker, useJsApiLoader } from '@react-google-maps/api';
import "./RegisterMap.css"
import { toast } from 'react-toastify';

function RegisterMap({adress , setAdress , isAdressOpen , setIsAdressOpen , name}) {
    const [currentPosition , setCurrentPosition] = useState({lat: 0, lng: 0})
    const [map, setMap] = useState(null)
    const autoCompleteRef = useRef();
    const [addressData , setAddressData] = useState({})
    const [autocomplete , setAoutocomplete] = useState(null)
    const mapRef = useRef();
    
    Geocode.setApiKey("<YOUR KEY>");
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

      const options = {
        styles: MapStyles,
        disableDefaultUI: true,
        zoomControl: true,
        
      };
      

      const getLocation = (e) =>{
        Geocode.fromLatLng(e.latLng.lat(), e.latLng.lng()).then(
          data => {
      let city = data.results[0].address_components.find(item => item.types[0] === "administrative_area_level_1")
      let district = data.results[0].address_components.find(item => item.types[0] === "administrative_area_level_2")  
      let lat = data.results[0].geometry.location.lat;
      let lng = data.results[0].geometry.location.lng;
      let address = data.results[0].formatted_address;
      autoCompleteRef.current.value = address;
      setAddressData({
        city: city.long_name,
        district: district.long_name,
        lat: lat,
        lng: lng,
        address: address
      })
          }
        )
        setCurrentPosition({
          lat: e.latLng.lat(),
          lng: e.latLng.lng(),
          time: new Date(),
        })
      }

      const onMapClick = React.useCallback((e) => {
          getLocation(e);
        }
          
          ,[]);
      
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
      
      const containerStyle = {
        width: '100%',
        height: '100%'
      };

      const onPlaceChanged = React.useCallback(function callback(data) {
      let city = data.address_components.find(item => item.types[0] === "administrative_area_level_1")
      let district = data.address_components.find(item => item.types[0] === "administrative_area_level_2")  
      let lat = data.geometry.location.lat()
      let lng = data.geometry.location.lng()
      let address = autoCompleteRef.current.value;
      setAddressData({
        city: city.long_name,
        district: district.long_name,
        lat: lat,
        lng: lng,
        address: address
      })
      setCurrentPosition({
        lat: lat,
        lng: lng,
        time: new Date(),
      })
    },[])

      const placesOptions = {
        types: ['address'],
        componentRestrictions:{country : "tr"}
      }

      const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
      }, [])
    return (
    <div onClick={(e)=>{e.target === e.currentTarget && setIsAdressOpen(false)}} className='register-map'>
        <div className='register-map-comp'>
           
            
            <div className='google-map-comp'>
                {isLoaded ? (
                    
                        <GoogleMap
                        onClick={(event) => onMapClick(event)}
                        mapContainerStyle={containerStyle}
                        center={currentPosition}
                        zoom={12}
                        options={options}
                        onLoad={onLoad}
                        onUnmount={onUnmount}
                        
                        >
                           <div className='search-location'>
            <Autocomplete
            apiKey='<YOUR KEY>'
            style={{
              width: '80%',
              padding: '10px',
             
              borderRadius: '5px',
              
            }}
            ref={autoCompleteRef}
            options={placesOptions}
            placeholder='Konumunuzu Girin Veya Haritada Tıklayınız'
            onPlaceSelected={(place)=>{onPlaceChanged(place)}}
            
            >
              
            </Autocomplete>
            </div>
            
            <Marker  
             icon={{
            url: "https://avatars.dicebear.com/api/adventurer/"+name+".svg",
            scaledSize: new window.google.maps.Size(50, 50),
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(15, 15)
           }}
             position={{ lat: currentPosition.lat, lng: currentPosition.lng }} />   
                        </GoogleMap>
                        )
                        : 
                        <div>Loading...</div>

                }
             </div>
             
                <button className='save-button' onClick={()=>{
                    toast.success("Konumunuz Kaydedildi", {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: true,
                        closeOnClick: true,
                    })
                    setIsAdressOpen(false);
                    setAdress(addressData);
                }
                }> Adresinizi Kayıt Edin <img src='https://cdn.getir.com/address-emojies/House.svg'></img></button>
             
        </div>
    </div>
  )
}

export default RegisterMap
