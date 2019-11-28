import React from 'react'
import ReactDOM from 'react-dom'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

import SearchDebtorInput from './components/search-debtor-input'

const theme = createMuiTheme({
        palette: {
            primary: {
                main: '#2b655a'
            },
            secondary: {
                main: '#bc4747'
            }
        }
    },
)

class App extends React.Component{
    render(){
        return(
            <MuiThemeProvider theme={theme}>
                <SearchDebtorInput/>
            </MuiThemeProvider>
        )

    }
}

ReactDOM.render(<App />, document.getElementById('app'))