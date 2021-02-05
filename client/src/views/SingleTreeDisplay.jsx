import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Grid, makeStyles } from '@material-ui/core'




const useStyles = makeStyles({
    test: {
        border: '2px solid black',
        // width: '100%',
        // height: '100%'
    },
    mainFrame: {
        marginTop: '200px'
    }
})
const SingleTreeDisplay = props => {
    const classes = useStyles()
    const [tree, setTree] = useState(null)
    const [uploader, setUploader] = useState(null)
    // console.log(props.id)
    useEffect(() => {
        axios.get(`http://localhost:8000/api/trees/${props.id}`)
            .then(res => {
                console.log(res.data.tree)
                setTree(res.data.tree)
                axios.get(`http://localhost:8000/api/users/${res.data.tree.user}`)
                    .then(res => setUploader(res.data.user))
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
    }, [])
    return (
        <>
            {
                uploader ? (
                    <Grid className = { classes.mainFrame } container spacing={3}>
                        <Grid lg = {1}></Grid>
                        <Grid item xs={12} md={6} lg={2}>
                            {/* {console.log(tree)} */}
                            {console.log(`http://localhost:3000/images/wholeTree/${tree.wholeTree}`)}
                            <img className = {classes.test} src={`http://localhost:8000/static/images/wholeTree/${tree.wholeTree}`} alt="Whole Tree" />
                        </Grid>
                        <Grid item xs={12} md={6} lg={2}>
                        <img className = {classes.test} src={`http://localhost:8000/static/images/leaf/${tree.leaf}`} alt="Leaf" />
                        </Grid>
                        <Grid item xs={12} md={6} lg={2}>
                        <img className = {classes.test} src={`http://localhost:8000/static/images/trunk/${tree.trunk}`} alt="Trunk" />
                        </Grid>
                        <Grid item xs={12} md={6} lg={2}>
                        <img className = {classes.test} src={`http://localhost:8000/static/images/fruit/${tree.fruit}`} alt="Fruit" />
                        </Grid>
                        <Grid item xs={12} md={6} lg={2}>
                        <img className = {classes.test} src={`http://localhost:8000/static/images/bud/${tree.bud}`} alt="Bud" />
                        </Grid>

                    </Grid>
                ) : ''
            }
        </>
    )
}




export default SingleTreeDisplay