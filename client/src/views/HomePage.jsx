import React, { useState, useEffect } from 'react'
import MainMap from '../components/MainMap'
import axios from 'axios'
import { Grid, InputLabel, Select, MenuItem, makeStyles, Container, TextField, Button } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import treeNames from '../treeNames'
import genera from '../genus'
import { LocalConvenienceStoreOutlined } from '@material-ui/icons'
const useStyles = makeStyles((theme) => ({
    mapGrid: {
        display: 'flex',
        justifyContent: 'center',

        // marginLeft: '20px'
    },
    tabs: {
        display: 'flex',
        justifyContent: 'space-between'
    }
}));

const searchByScientificName = (allTrees, search) => {
    let refinedTrees = []
    let genus = search.split(' ')[0]
    let species = search.split(' ')[1]
    allTrees.map((item, index) => {
        if (item.genus == genus && item.species == species) {
            refinedTrees.push(item)
        }
    })
    // console.log(refinedTrees)
    return refinedTrees
}
const searchByOther = (allTrees, search, searchBy) => {
    let refinedTrees = []
    console.log(allTrees, search, searchBy)
    if (searchBy == 'genus' || searchBy == 'habitat') {
        allTrees.map((item, index) => {
            if (item[searchBy] == search) {
                refinedTrees.push(item)
            }
        })
        return refinedTrees
    } else {
        return allTrees.filter(tree => tree['commonName'].toLowerCase().includes(search.toLowerCase()) )
    }
}

const HomePage = props => {

    const classes = useStyles()
    const [allTrees, setAllTrees] = useState(null)
    const [trees, setTrees] = useState(null)
    const [searchBy, setSearchBy] = useState('sName')
    const [search, setSearch] = useState('')
    const [searchFlag, setSearchFlag] = useState(true)
    const [tabController, setTabController] = useState(true)
    // console.log(props.loggedUser)
    useEffect(() => {
        axios.get('http://localhost:8000/api/trees')
            .then(res => {
                if( tabController ){
                    setTrees(res.data.trees)
                    setAllTrees(res.data.trees)
                }else{
                    let userTrees = []
                    res.data.trees.map((tree, index) => {
                        console.log(tree.user, props.loggedUser._id)
                        if(tree.user === props.loggedUser._id){
                            userTrees.push(tree)
                        }
                    })
                    setTrees(userTrees)
                    setAllTrees(userTrees)
                }

            })
            .catch(err => console.log(err))

    }, [tabController])

    const autoSearchHandler = e => {
        setSearch(e.target.innerText)
    }
    const searchHandler = e => {
        setSearch(e.target.value)
    }
    const handleSearchBy = e => {
        setSearchBy(e.target.value)
    }
    const onSubmitHandler = e => {
        e.preventDefault()
        searchBy == 'sName' ?
            setTrees(searchByScientificName(allTrees, search)) :
            setTrees(searchByOther(allTrees, search, searchBy))
    }
    const resetHandler = () => {
        setTrees(allTrees)
    }
    return (
        <>
            <div style={{ marginTop: '50px' }}>



                <form onSubmit={onSubmitHandler}>
                    <Grid container spacing={3} style={{ display: 'flex', alignItems: 'center' }}>
                        <Grid item xs={2}></Grid>
                        <Grid item xs={3}>
                            <div>
                                <InputLabel id="searchBy">Search By:</InputLabel>
                                <Select
                                    labelId="searchBy"
                                    id="searchBy"
                                    value={searchBy}
                                    onClick={handleSearchBy}
                                    variant='outlined'
                                >
                                    <MenuItem value='genus'>Genus</MenuItem>
                                    <MenuItem value='sName'>Scientific Name</MenuItem>
                                    <MenuItem value='commonName'>Common Name</MenuItem>
                                    <MenuItem value='habitat'>Habitat</MenuItem>
                                </Select>
                            </div>
                        </Grid>
                        <Grid item xs={3}>
                            {
                                searchBy == 'sName' ?
                                    (
                                        <Autocomplete
                                            id="sName"
                                            options={treeNames}
                                            getOptionLabel={(option) => option}
                                            // style={{ width: 300 }}
                                            onChange={autoSearchHandler}
                                            renderInput={(params) => <TextField {...params} placeholder='Genus species' label="Scientific Name" variant="outlined"
                                            />}
                                        />
                                    ) :
                                    (
                                        searchBy == 'genus' ?
                                            <Autocomplete
                                                id="genus"
                                                options={genera}
                                                getOptionLabel={(option) => option}
                                                // style={{ width: 300 }}
                                                onChange={autoSearchHandler}
                                                renderInput={(params) => <TextField {...params} placeholder='Genus' label="Genera" variant="outlined"
                                                />}
                                            /> : (
                                                searchBy == 'habitat' ?
                                                    <div>
                                                        <InputLabel id="habitat">Habitat:</InputLabel>
                                                        <Select
                                                            required
                                                            labelId="habitat"
                                                            id="habitat"
                                                            name='habitat'
                                                            value={search}
                                                            onClick={searchHandler}
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
                                                    </div> :
                                                    <TextField
                                                        // required
                                                        id="search"
                                                        name="search"
                                                        label="Search..."

                                                        onChange={searchHandler}
                                                        // autoComplete="given-name"
                                                        variant='outlined'
                                                    />
                                            )


                                    )}
                        </Grid>
                        <Grid item xs={2}>
                            <div>
                                <button style={{ border: '0px', backgroundColor: 'white', marginBottom: '8px' }} type='submit'><Button style={{ backgroundColor: 'green', color: 'white' }} component="span" variant='contained'>Search</Button></button>
                                <Button style={{ backgroundColor: 'gray', color: 'black' }} component="span" variant='contained' onClick={resetHandler}>All</Button>
                            </div>
                        </Grid>

                    </Grid>
                </form>



                <div className={classes.mapGrid}>
                    {
                        allTrees ? <MainMap tabController = { tabController } setTabController = { setTabController } trees={trees} /> : <></>
                    }
                </div>
            </div>
        </>
    )
}

export default HomePage