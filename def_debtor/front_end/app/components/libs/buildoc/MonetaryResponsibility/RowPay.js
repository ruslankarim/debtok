import React from 'react'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Add from '@material-ui/icons/Add'
import Remove from '@material-ui/icons/Remove'


class RowPay extends React.Component {

    render(){

        return(
            <Grid item container spacing={8}>
                <Grid item xs={5}>
                    <TextField fullWidth type='date' variant='outlined'/>
                </Grid>
                <Grid item xs={5}>
                    <TextField fullWidth variant='outlined'/>
                </Grid>
                <Grid container item xs={1}>
                    <Add/>
                    <Remove/>
                </Grid>
            </Grid>

        )
    }


}

export default RowPay