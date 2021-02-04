import React, { useState, useEffect } from 'react';
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Paper, Box, Grid, Typography, makeStyles } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Link, navigate } from '@reach/router'
import axios from 'axios'



const Copyright = () => {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link to='/'>
                Casey Ferriola
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://images.all-free-download.com/images/graphiclarge/forest_513162.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',   
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: 'silver',
        // color: ''
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const Login = (props) => {
    const classes = useStyles();

    useEffect(() => {
        axios.get('http://localhost:8000/api/logout')
        .then(res => {
            navigate('/')
            props.setLoggedUser('')
        })
        .catch(err => console.log(err))
    }, [])
    const [user, setUser] = useState({
        email: '', 
        password: ''
    })
    const [error, setError] = useState({})

    const onChangeHandler = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const onSubmitHandler = e => {
        e.preventDefault()
        setError({})
        axios.post(`http://localhost:8000/api/users/authenticate`, user)
            .then(res => {
                console.log(res)
                if(res.data.message){
                    props.setLoggedUser(res.data.user)
                    navigate('/trees')
                }else {
                    setError(res.data)
                }
            })
    }
    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={5} md={8} className={classes.image} />
            <Grid item xs={12} sm={7} md={4} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className={classes.form} noValidate onSubmit = {onSubmitHandler}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoFocus
                            onChange={onChangeHandler}
                        />
                        {error.email ? <small style={{color: 'red', fontWeight: 'bold'}}>{error.email}</small>: ''}
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            onChange={onChangeHandler}
                        />
                        {error.password ? <small style={{color: 'red', fontWeight: 'bold'}}>{error.password}</small>: ''}<br></br>
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me?"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            // color="primary"
                            style = {{backgroundColor: '#4caf50', color: 'white'}}
                            className={classes.submit}
                        >
                            Sign In
            </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link to='/'>
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link to='/register'>
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                        <Box mt={5}>
                            <Copyright />
                        </Box>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
}

export default Login