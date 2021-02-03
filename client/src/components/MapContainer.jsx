import React, { useEffect, useState } from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { Typography, IconButton, makeStyles } from '@material-ui/core'
import { MyLocation } from '@material-ui/icons'
const containerStyle = {
    width: '25rem',
    height: '25rem',
    border: '10px solid gray',
    borderStyle: 'outset'
};

const useStyles = makeStyles((theme) => ({
    mapStyle: {
        border: '10px solid green'
    }
}));


function MapContainer(props) {
    const classes = useStyles()

    const [currentPosition, setCurrentPosition] = useState({});
    const [locationFlag, setLocationFlag] = useState(true)
    console.log('hello')
    const [map, setMap] = React.useState(null)

    const success = position => {
        const currentPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        }
        setCurrentPosition(currentPosition);
    };

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY
    })

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(success);
    }, [locationFlag])



    // const onLoad = React.useCallback(function callback(map) {
    //     const bounds = new window.google.maps.LatLngBounds();
    //     map.fitBounds(bounds);
    //     setMap(map)
    // }, [])

    const [mark, setMark] = useState(null)

    const onClickHandler = e => {
        console.log(e.latLng.lat().toFixed(4), e.latLng.lng(), props.location)
        setMark({
            lat: e.latLng.lat(),
            lng: e.latLng.lng()
        })
        props.locate({ lat: e.latLng.lat(), lng: e.latLng.lng() })
    }
    const locationHandler = e => {
        setLocationFlag(!locationFlag)
    }

    return isLoaded ? (
        <div id='mapStyle'>
            <IconButton edge='start' style={{ color: 'green' }} aria-label='nature' onClick = {locationHandler}>
                <MyLocation fontSize='large' />

                <Typography style={{ color: 'green', marginLeft: '20px', fontFamily: 'candara' }} variant="h5" noWrap>
                    Find Your Location
                    </Typography>
            </IconButton>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={currentPosition}
                zoom={14}
                // onLoad={onLoad}
                onClick={onClickHandler}
                
            >
                {
                    mark ? <Marker key="Friends" position={mark} /> : ''
                }


            </GoogleMap>
            <small><i>Please click the map to identify the tree's location</i></small>
        </div>
    ) : <></>
}

export default React.memo(MapContainer)