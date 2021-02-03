import React, { useEffect, useState } from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { Typography, IconButton, makeStyles } from '@material-ui/core'
import { Add, MyLocation } from '@material-ui/icons'
import { navigate } from '@reach/router'

const containerStyle = {
    width: '50rem',
    height: '30rem',
    // width: '400%',
    // height: '500%',
    border: '10px solid gray',
    borderStyle: 'outset'
};

const useStyle = makeStyles({
    mapButtons: {
        display: 'flex',
        justifyContent: 'space-around'
    }
})

function MainMap(props) {
    const classes = useStyle()


    const [currentPosition, setCurrentPosition] = useState({});
    const [locationFlag, setLocationFlag] = useState(true)
    const [map, setMap] = React.useState(null)
    // console.log(props.trees[0].location)

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



    const addTreeHandler = e => {
        navigate('/trees/new')
    }


    const locationHandler = e => {
        setLocationFlag(!locationFlag)
    }

    return isLoaded ? (
        <div id='mapStyle'>
            <div className= {classes.mapButtons}>
            <IconButton edge='start' style={{ color: 'green' }} aria-label='nature' onClick={addTreeHandler}>
                <Add fontSize='large' />

                <Typography style={{ color: 'green', marginLeft: '20px', fontFamily: 'candara' }} variant="h5" noWrap>
                    Add Tree
                    </Typography>
            </IconButton>
            <IconButton edge='start' style={{ color: 'green' }} aria-label='nature' onClick={locationHandler}>
                <MyLocation fontSize='large' />

                <Typography style={{ color: 'green', marginLeft: '20px', fontFamily: 'candara' }} variant="h5" noWrap>
                    Your Location
                    </Typography>
            </IconButton>
            </div>

            <GoogleMap
                mapContainerStyle={containerStyle}
                center={currentPosition}
                zoom={12}
                // mapTypeId= {Satellite}
                // onLoad={onLoad}
            >
                {
                    props.trees ?
                    (
                        props.trees.map((item, index) => {
                        {console.log(typeof parseFloat(item.location.lat))}
                        return <Marker 
                        key= {item._id} 
                        position= {{lat: parseFloat(item.location.lat), lng: parseFloat(item.location.lng)}}
                        label = {item.genus[0]}
                        />
                    })
                    ): ''
                }
                <Marker style = {{ backgroundColor: 'green' }} opacity = {1} key = 'hello' position = {{lng: 40.6837, lat: 73.9750}} label = 'A' />
            </GoogleMap>
            <small><i>Search for trees anywhere in the world</i></small>
        </div>
    ) : <></>
}

export default React.memo(MainMap)