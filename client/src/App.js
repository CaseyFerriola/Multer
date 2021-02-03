
import React, { useEffect, useState } from 'react'

import './App.css'
// import MyComponent from './components/MyComponent'
import CreateTree from './views/CreateTree'
import 'materialize-css/dist/css/materialize.min.css'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from './theme'
import NavBar from './components/NavBar'
import background from './images/TreeBackground3.png'
import HomePage from './views/HomePage'
import { Router, navigate } from '@reach/router'
import Login from './views/Login'
import Register from './views/Register'

const style = {
  backgroundImage: `url(${background})`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: '-135px',
  backgroundAttachment: 'fixed'
}


function App() {
  const [loggedUser, setLoggedUser] = useState(null)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('loggedUser')) || null
    setLoggedUser(user)
  },[])

  useEffect(() => {
    localStorage.setItem('loggedUser', JSON.stringify(loggedUser))
  }, [loggedUser])


  return (
    <>
      <Router>
        <Login  setLoggedUser = { setLoggedUser } path='/' />
        <Register setLoggedUser = { setLoggedUser } path= '/register'/>
      </Router>
      <div className='App' style={style}>
        <ThemeProvider theme={theme}>
          <CssBaseline>
            <NavBar setLoggedUser = { setLoggedUser }/>
            <div className='main container'>

              <Router>
                <CreateTree loggedUser = { loggedUser } path='/trees/new' />
                <HomePage loggedUser = { loggedUser } path='/trees' />
              </Router>
            </div>
          </CssBaseline>

        </ThemeProvider>
      </div>
    </>

  );

}






export default App