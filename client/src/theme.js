import { createMuiTheme } from '@material-ui/core/styles'


const theme = createMuiTheme({
    palette: {
        primary: { 
            main: '#4caf50', 
            dark: '#357a38', 
            light: '#6fbf73' },
        text: {
            secondary: "green"
        }
    }, 
})


export default theme