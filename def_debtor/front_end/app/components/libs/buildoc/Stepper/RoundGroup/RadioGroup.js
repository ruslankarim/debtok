import React, {Component} from 'react'
import {withStyles} from "@material-ui/core"
import Grid from "@material-ui/core/Grid/Grid"
import RadioButtonUnchecked from '@material-ui/icons/RadioButtonUnchecked'
import RadioButtonChecked from '@material-ui/icons/RadioButtonChecked'


const styles = () => ({

})


class RadioGroup extends Component{

    render(){
        return(
            <Grid container spacing={8}>
                <Grid item>
                    <RadioButtonChecked color="primary"/>
                </Grid>
                <Grid item>
                    <RadioButtonUnchecked color="error"/>
                </Grid>
                <Grid item>
                    <RadioButtonUnchecked/>
                </Grid>
                <Grid item>
                    <RadioButtonUnchecked/>
                </Grid>
            </Grid>
        )
    }


}

export default withStyles(styles)(RadioGroup)