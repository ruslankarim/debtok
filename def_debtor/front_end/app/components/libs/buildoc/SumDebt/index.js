import React, {Component} from 'react'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import collect, {DATA} from '../collector/collector'



class SumDebt extends Component {

    onchange = (e) => {
        collect({sumDebt: e.target.value})
    }

    render(){
        return(
            <Grid item>
                <TextField variant='outlined' onChange={this.onchange}/>
            </Grid>
        )
    }
}

export default SumDebt