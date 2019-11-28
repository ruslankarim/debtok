import React, {Component} from 'react'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import collect from '../collector/collector'



class Contract extends Component {

    onchangeDate = (e) => {
        collect({dateContract: e.target.value})
    }

    onchangeNum = (e) => {
        collect({numContract: e.target.value})
    }

    render(){

        return(
            <Grid item container spacing={8}>
                <Grid item>
                    <TextField type='date' variant='outlined' onChange={this.onchangeDate}/>
                </Grid>
                <Grid item>
                    <TextField variant='outlined' onChange={this.onchangeNum}/>
                </Grid>
            </Grid>

        )
    }
}

export default Contract