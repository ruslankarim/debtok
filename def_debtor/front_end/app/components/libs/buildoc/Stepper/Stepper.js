import React, {Component} from 'react'
import {withStyles} from "@material-ui/core"
import Grid from "@material-ui/core/Grid/Grid"
import Button from "@material-ui/core/Button/Button"
import RadioGroup from './RoundGroup/RadioGroup'
import ChevronLeft from '@material-ui/icons/ArrowBackIos'
import ChevronRight from '@material-ui/icons/ArrowForwardIos'


const styles = () => ({

})

class Stepper extends Component {
    render(){
        return(
            <Grid container>
                <Grid item>
                    <Button size="small" disabled={true}>
                        <ChevronLeft/>
                    </Button>
                </Grid>
                <Grid item>
                    <Button size="small" disabled={false}>
                        <ChevronRight/>
                    </Button>
                </Grid>
            </Grid>
        )
    }

}

export default withStyles(styles)(Stepper);