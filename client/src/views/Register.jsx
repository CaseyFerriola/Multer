import React, { useState, useEffect } from 'react';
import { Avatar, Button, CssBaseline, TextField, Paper, Grid, Typography, makeStyles } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Link, navigate } from '@reach/router'
import axios from 'axios'


const Copyright = () => {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="#">
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

const Register = (props) => {
    const classes = useStyles();
    const [newUser, setNewUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    })
    const [error, setError] = useState({})

    useEffect(() => {
        axios.get('http://localhost:8000/api/logout')
        .then(res => {
            navigate('/')
            props.setLoggedUser('')
        })
        .catch(err => console.log(err))
    }, [])
    
    const onChangeHandler = e => {
        // console.log(e.target)
        setNewUser({
            ...newUser,
            [e.target.name]: e.target.value
        })
    }

    const onSubmitHandler = e => {
        // setError({})
        e.preventDefault()
        console.log('Submit Handler')
        axios.post('http://localhost:8000/api/users/create/new', newUser)
            .then(res => {
                if (!res.data.success) {
                    setError(res.data.error.errors)
                }else{
                    props.setLoggedUser(res.data.user)
                    navigate('/trees')
                }
            })
            .catch(err => console.log(err))
    }
    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={5} md={7} className={classes.image} />
            <Grid item xs={12} sm={7} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Register
                    </Typography>
                    <form className={classes.form} noValidate onSubmit={onSubmitHandler}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <>
                                    <TextField
                                        // autoComplete="fname"
                                        name="firstName"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        autoFocus
                                        onChange={onChangeHandler}
                                    />
                                    {error.firstName ? <small style={{ color: 'red', fontWeight: 'bold' }}>{error.firstName.message}</small> : ''}
                                </>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="lastName"
                                        label="Last Name"
                                        name="lastName"
                                        autoComplete="lname"
                                        onChange={onChangeHandler}
                                    />
                                    {error.lastName ? <small style={{ color: 'red', fontWeight: 'bold' }}>{error.lastName.message}</small> : ''}
                                </>
                            </Grid>
                            <Grid item xs={12}>
                                <>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        onChange={onChangeHandler}
                                    />
                                    {error.email ? <small style={{ color: 'red', fontWeight: 'bold' }}>{error.email.message}</small> : ''}
                                </>
                            </Grid>
                            <Grid item xs={12}>
                                <>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                        onChange={onChangeHandler}
                                    />
                                    {error.password ? <small style={{ color: 'red', fontWeight: 'bold' }}>{error.password.message}</small> : ''}
                                </>
                            </Grid>
                            <Grid item xs={12}>
                                <>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="confirmPassword"
                                        label="Password Confirmation"
                                        type="password"
                                        id="confirmPassword"
                                        onChange={onChangeHandler}
                                    // autoComplete="current-password"
                                    />
                                    {error.confirmPassword ? <small style={{ color: 'red', fontWeight: 'bold' }}>{error.confirmPassword.message}</small> : ''}
                                </>
                            </Grid>
                        </Grid>
                        <Grid container justify="center">
                            <Grid item>
                                
                                <Button
                                    type="submit"
                                    variant="contained"
                                    style={{ backgroundColor: '#4caf50', color: 'white' }}
                                    className={classes.submit}
                                >
                                    Register
                                </Button>

                            </Grid>
                        </Grid>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link to='/'>
                                    Already have an account? Log in
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
}

export default Register