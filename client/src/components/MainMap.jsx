import React, { useEffect, useState } from 'react'
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { Typography, IconButton, makeStyles, Button } from '@material-ui/core'
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
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    },
    tab: {
        borderBottomLeftRadius: '0px',
        borderBottomRightRadius: '0px',
        borderTopLeftRadius: '8px',
        borderTopRightRadius: '8px',
    },
    offTab: {
        backgroundColor: 'gray',
        color: 'black',
        zIndex: 0
    },
    onTab: {
        backgroundColor: 'black',
        color: 'gray',
        zIndex: 1
    },
    rightTab: {
        marginLeft: '-10px'
    },
    image: {
        width: '75px'
    }

})

function MainMap(props) {
    const classes = useStyle()


    const [currentPosition, setCurrentPosition] = useState({});
    const [locationFlag, setLocationFlag] = useState(true)
    const [map, setMap] = React.useState(null)
    const [markerMap, setMarkerMap] = useState({})
    const [markerHover, setMarkerHover] = useState(null)
    const [infoOpen, setInfoOpen] = useState(false)

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
    const markerLoadHandler = (marker, tree) => {
        setMarkerMap(prevState => {
            // console.log(prevState)
            return { ...prevState, [tree._id]: marker }
        })
        // console.log(markerMap)
    }
    const handleMarkerHover = (e, place) => {
        // console.log(markerMap)
        setMarkerHover(place)
        if (!infoOpen)
            setInfoOpen(true)
    }

    const handleMarkerLeave = (e, place) => {
        setMarkerHover(null)
        if (infoOpen) {
            setInfoOpen(false)
        }
    }
    const markerClickHandler = (event, item) => {
        console.log('clicked')
        navigate(`/trees/${item._id}`)
    }
    const allTabHandler = e => {
        props.setTabController(true)
    }

    const yourTabHandler = e => {
        props.setTabController(false)
    }

    const addTreeHandler = e => {
        navigate('/trees/new')
    }


    const locationHandler = e => {
        setLocationFlag(!locationFlag)
    }

    return isLoaded ? (
        <div id='mapStyle'>
            <div className={classes.mapButtons}>
                <div>
                    <Button className={props.tabController ? `${classes.tab} ${classes.onTab}` : `${classes.tab} ${classes.offTab}`} component="span" variant='contained' onClick={allTabHandler}>All Trees</Button>
                    <Button className={props.tabController ? `${classes.tab} ${classes.rightTab} ${classes.offTab}` : `${classes.tab} ${classes.rightTab} ${classes.onTab}`} component="span" variant='contained' onClick={yourTabHandler}>Your Trees</Button>
                </div>
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
                            props.trees.map((tree, index) => {
                                // { console.log(typeof parseFloat(tree.location.lat)) }
                                return <Marker
                                    key={tree._id}
                                    position={{ lat: parseFloat(tree.location.lat), lng: parseFloat(tree.location.lng) }}
                                    label={tree.genus[0]}
                                    onClick={(event) => markerClickHandler(event, tree)}
                                    onLoad={marker => markerLoadHandler(marker, tree)}
                                    onMouseOver={e => handleMarkerHover(e, tree)}
                                    onMouseOut={e => handleMarkerLeave(e, tree)}
                                >

                                    {
                                        infoOpen && (markerHover == tree) && (
                                            <InfoWindow>
                                                <>
                                                    <strong><p>{`${tree.genus} ${tree.species}`}</p> </strong>
                                                    <img className = { classes.image } src={`http://localhost:8000/static/images/wholetree/${tree.wholeTree}`} alt="Whole Tree Picture" />
                                                </>
                                            </InfoWindow>
                                        )
                                    }
                                </Marker>
                            })
                        ) : ''
                }
            </GoogleMap>
            <small><i>Search for trees anywhere in the world</i></small>
        </div>
    ) : <></>
}

export default React.memo(MainMap)




