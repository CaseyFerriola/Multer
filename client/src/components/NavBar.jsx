import React from 'react'
import { AppBar, Toolbar, makeStyles, IconButton, Typography, List, ListItem, ListItemText, Container, Hidden } from '@material-ui/core'
import { Nature, ContactSupport, AccountBox, ExitToApp } from '@material-ui/icons'
import { navigate } from '@reach/router'
import axios from 'axios'
const useStyles = makeStyles((theme) => ({
    header: {
        color: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        fontFamily: ''
    },
    headerList: {
        display: 'flex',
        justifyContent: 'space-around',
    }

}));

const navLinks = {

}

const NavBar = (props) => {
    const classes = useStyles()


    const logoutHandler = () => {
        axios.get('http://localhost:8000/api/logout', { withCredentials: true })
            .then(res => {
                navigate('/')
                props.setLoggedUser('')
            })
            .catch(err => console.log(err))
    }
    return (
        <AppBar position='fixed' >
            <Toolbar  >
                <Container maxWidth='lg' className={classes.header} >
                    <IconButton onClick = { () => navigate('/trees') } edge='start' style={{ color: 'white' }} aria-label='nature'>
                        <Nature fontSize='large' />

                        <Typography style={{ color: 'white', marginLeft: '20px', fontFamily: 'candara' }} variant="h5" noWrap>
                            TreeTracker
                    </Typography>
                    </IconButton>
                    <List className={classes.headerList} componenet='nav' aria-label='main navigation'>

                        <ListItem button>
                            <AccountBox />
                            <Hidden xsDown><ListItemText><Typography style={{ marginLeft: '10px', fontFamily: 'candara' }} noWrap>Your Profile</Typography></ListItemText></Hidden>
                        </ListItem>
                        <ListItem button>
                            <ContactSupport />
                            <Hidden xsDown><Typography style={{ marginLeft: '10px', fontFamily: 'candara' }} noWrap>Contact Us</Typography></Hidden>
                        </ListItem>
                        <ListItem button onClick={logoutHandler}>
                            <ExitToApp />
                            <Hidden xsDown><Typography style={{ marginLeft: '10px', fontFamily: 'candara' }} noWrap>Log Out</Typography></Hidden>
                        </ListItem>
                    </List>
                </Container>
            </Toolbar>

        </AppBar>
    )

}

export default NavBar