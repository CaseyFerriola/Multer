import React, { useState } from 'react'
import axios from 'axios'
import MapContainer from './MapContainer'
import "material-design-icons/iconfont/material-icons.css";
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden'
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import Button from '@material-ui/core/Button'
import {Select, MenuItem, InputLabel } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Clear from '@material-ui/icons/Clear'
import { makeStyles } from '@material-ui/core/styles';
import {navigate} from '@reach/router'
import treeNames from '../treeNames'
//Style
const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            fontFamily: 'candara !important'
        },
    },
    input: {
        display: 'none',
    },
    textfield: {
        // marginLeft: '20px'
    }
}));

//STATES
const TreeForm = props => {
    console.log(props.loggedUser)
    const classes = useStyles()
    const [tree, setTree] = useState({
        genus: '',
        species: '',
        commonName: '',
        habitat: '',
        // user: props.loggedUser._id, 
        wholeTree: null,
        leaf: null,
        trunk: null,
        fruit: null,
        bud: null,
        location: null
    })
    const [error, setError] = useState({})

    //HANDLERS
    const textChangeHandler = e => {
        // console.log(e.target)
        setTree({
            ...tree,
            [e.target.name]: e.target.value
        })
    }

    const nameChangeHandler = e => {
        let sciName = e.target.innerText
        if (sciName) {
            setTree({
                ...tree,
                genus: sciName.split(' ')[0],
                species: sciName.split(' ')[1]
            })
        }

    }
    const imageChangeHandler = e => {
        // console.log(e.target.files[0])
        setTree({
            ...tree,
            [e.target.name]: e.target.files[0]
        })
    }

    const locateTree = newLocation => {
        setTree({
            ...tree,
            location: newLocation
        })
    }
    const onSubmitHandler = e => {
        e.preventDefault()
        setError({})
        const data = new FormData()
        data.append("genus", tree.genus)
        data.append("species", tree.species)
        data.append("commonName", tree.commonName)
        data.append("habitat", tree.habitat)
        // data.append("user", tree.user)
        for (var key in tree.location) {
            data.append(key, tree.location[key]);
        }
        data.append("wholeTree", tree.wholeTree)
        data.append("leaf", tree.leaf)
        data.append("trunk", tree.trunk)
        data.append("fruit", tree.fruit)
        data.append("bud", tree.bud)
        axios.post('http://localhost:8000/api/trees/create/new', data)
            .then(res => {
                if (!res.data.tree) {
                    setError(res.data)
                    
                } else {
                    console.log("success")
                    navigate('/trees')
                }
            })
            .catch(err => console.log(err))
    }


    return (

        <form className={classes.root} encType='multipart/form-data' onSubmit={onSubmitHandler}>

            <Typography variant="h3" style={{ fontFamily: 'candara', fontWeight: 'bold', marginTop: '40px' }} color='textSecondary' gutterBottom>
                Plot a Tree
            </Typography>
            {/* WHOLE FORM */}
            <Grid container>
                {/* LEFT SIDE (TEXT INPUTS AND FILES) */}
                <Grid container xs={12} md={8}>
                    <Grid item xs={12} sm={10} >
                        <Autocomplete
                            id="sName"
                            options={treeNames}
                            getOptionLabel={(option) => option}
                            // style={{ width: 300 }}
                            onChange={nameChangeHandler}
                            renderInput={(params) => <TextField {...params} required placeholder='Genus species' label="Scientific Name" variant="outlined"
                                helperText={error.genus ? error.genus : ""} />}
                        />
                    </Grid>
                    <Grid item xs={12} sm={10} >
                        <TextField
                            id="commonName"
                            name="commonName"
                            label="Common name"
                            fullWidth
                            onChange={textChangeHandler}
                            autoComplete="given-name"
                            variant='outlined'
                            
                        />
                    </Grid>
                    <Grid item xs={12} sm={10}>

                        <div>
                            <InputLabel id="habitat">Habitat:</InputLabel>
                            <Select
                                required
                                labelId="habitat"
                                id="habitat"
                                name = 'habitat'
                                value={tree.habitat}
                                onClick={textChangeHandler}
                                variant='outlined'
                                fullWidth
                            >
                                <MenuItem value='Swamp, River or Lakeside'>Swamp, River or Lakeside</MenuItem>
                                <MenuItem value='Typical Woods'>Typical Woods</MenuItem>
                                <MenuItem value='Dry and Fire-Prone'>Dry and Fire-Prone</MenuItem>
                                <MenuItem value='Arid Desert'>Arid Desert</MenuItem>
                                <MenuItem value='Alpine'>Alpine</MenuItem>
                                <MenuItem value='Temperate Rainforest'>Temperate Rainforest</MenuItem>
                                <MenuItem value='Savanna'>Savanna</MenuItem>
                                <MenuItem value='Tropical Rainforest'>Tropical Rainforest</MenuItem>
                                <MenuItem value='Prarie'>Prarie</MenuItem>
                            </Select>
                        </div>
                    </Grid>
                    <Hidden smDown><Grid item sm={2}></Grid></Hidden>
                    <Grid item xs={6} sm={4} lg={2}>
                        <div className={classes.root}>
                            <input type="file" id='wholeTree' name='wholeTree' className={classes.input} multiple accept="image/*" onChange={imageChangeHandler} />
                            <label htmlFor="wholeTree">
                                <Button variant="contained" style={{ backgroundColor: 'green', color: 'white' }} component="span">
                                    Tree
                            </Button>
                            </label>
                            <input accept="image/*" id="wholeTree" name='wholeTree' type="file" className={classes.input} onChange={imageChangeHandler} />
                            <label htmlFor="icon-button-file">
                                <IconButton aria-label="upload picture" component="span">
                                    {!tree.wholeTree && error.wholeTree ? <> <PhotoCamera style={{ color: 'green' }} /> <Clear style={{ color: 'red' }} /> </> :
                                        <PhotoCamera style={{ color: 'green' }} />}

                                </IconButton>

                            </label>
                        </div>
                    </Grid>
                    <Grid item xs={6} sm={4} lg={2}>
                        <div className={classes.root}>
                            <input type="file" id='leaf' name='leaf' className={classes.input} multiple accept="image/*" onChange={imageChangeHandler} />
                            <label htmlFor="leaf">
                                <Button variant="contained" style={{ backgroundColor: 'green', color: 'white' }} component="span">
                                    Leaf
                            </Button>
                            </label>
                            <input accept="image/*" id="leaf" name='leaf' type="file" className={classes.input} onChange={imageChangeHandler} />
                            <label htmlFor="icon-button-file">
                                <IconButton aria-label="upload picture" component="span">
                                    {!tree.leaf && error.leaf ? <> <PhotoCamera style={{ color: 'green' }} /> <Clear style={{ color: 'red' }} /> </> :
                                        <PhotoCamera style={{ color: 'green' }} />}
                                </IconButton>

                            </label>
                        </div>
                    </Grid>
                    <Grid item xs={6} sm={4} lg={2}>
                        <div className={classes.root}>
                            <input type="file" id='trunk' name='trunk' className={classes.input} multiple accept="image/*" onChange={imageChangeHandler} />
                            <label htmlFor="trunk">
                                <Button variant="contained" style={{ backgroundColor: 'green', color: 'white' }} component="span">
                                    Trunk
                            </Button>
                            </label>
                            <input accept="image/*" id="trunk" name='trunk' type="file" className={classes.input} onChange={imageChangeHandler} />
                            <label htmlFor="icon-button-file">
                                <IconButton aria-label="upload picture" component="span">
                                    {!tree.trunk && error.trunk ? <> <PhotoCamera style={{ color: 'green' }} /> <Clear style={{ color: 'red' }} /> </> :
                                        <PhotoCamera style={{ color: 'green' }} />}
                                </IconButton>
                            </label>
                        </div>
                    </Grid>
                    <Grid item xs={6} sm={4} lg={2}>
                        <div className={classes.root}>
                            <input type="file" id='fruit' name='fruit' className={classes.input} multiple accept="image/*" onChange={imageChangeHandler} />
                            <label htmlFor="fruit">
                                <Button variant="contained" style={{ backgroundColor: 'green', color: 'white' }} component="span">
                                    Fruit
                            </Button>
                            </label>
                            <input accept="image/*" id="fruit" name='fruit' type="file" className={classes.input} onChange={imageChangeHandler} />
                            <label htmlFor="icon-button-file">
                                <IconButton aria-label="upload picture" component="span">
                                    {!tree.fruit && error.fruit ? <> <PhotoCamera style={{ color: 'green' }} /> <Clear style={{ color: 'red' }} /> </> :
                                        <PhotoCamera style={{ color: 'green' }} />}
                                </IconButton>
                            </label>
                        </div>
                    </Grid>
                    <Grid item xs={6} sm={4} lg={2}>
                        <div className={classes.root}>
                            <input type="file" id='bud' name='bud' className={classes.input} multiple accept="image/*" onChange={imageChangeHandler} />
                            <label htmlFor="bud">
                                <Button variant="contained" style={{ backgroundColor: 'green', color: 'white' }} component="span">
                                    Bud
                            </Button>
                            </label>
                            <input accept="image/*" id="bud" name='bud' type="file" className={classes.input} onChange={imageChangeHandler} />
                            <label htmlFor="icon-button-file">
                                <IconButton aria-label="upload picture" component="span">
                                    {!tree.bud && error.bud ? <> <PhotoCamera style={{ color: 'green' }} /> <Clear style={{ color: 'red' }} /> </> :
                                        <PhotoCamera style={{ color: 'green' }} />}
                                </IconButton>
                            </label>
                        </div>
                    </Grid>
                    {(error.wholeTree || error.leaf || error.trunk || error.fruit || error.bud) ?
                        <small style={{ color: "red" }}><strong>The following images were not uploaded: {error.wholeTree} {error.leaf} {error.trunk} {error.fruit} {error.bud}</strong></small> : ''}
                </Grid>

                {/* RIGHT SIDE (GOOGLE MAP) */}
                <Grid item xs={12} sm={4}>
                    <MapContainer locate={locateTree} />
                    {error.location ? <small style={{ color: 'red' }}><strong>{error.location}</strong></small> : ""}
                </Grid>
            </Grid>
            <input type="hidden" name="location" value={tree.location} />
            <button style={{ border: '0px', backgroundColor: 'white' }} type='submit'><Button style={{ backgroundColor: 'green', color: 'white' }} type='submit' component="span" variant='contained'>Submit</Button></button>



        </form >

    )
}


export default TreeForm



