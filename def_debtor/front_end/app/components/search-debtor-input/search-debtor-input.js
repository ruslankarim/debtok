import React, { Component } from 'react'
import AutocompleteParty from '../libs/buildoc/AutocompleteParty'
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        marginTop: '75px',
    },
});

export default function SearchDebtorInput () {
        const classes = useStyles()
        const [values, setValues] = React.useState({
            progress: false,
            response: false,
            message: ''
        })

        const handleProgress = () => {
            setValues({
                ...values,
                progress: true,
                response: false
            })
        }
        const handleResponse = (message) => {
            setValues({
                ...values,
                response: true,
                message: message
            })
        }


        return (
            <div className={classes.root}>
                {
                    !values.progress &&  !values.response ?
                        <AutocompleteParty handleProgress={handleProgress} handleResponse={handleResponse}/>
                    : values.progress && !values.response ?
                        <Grid container justify='center' alignItems='center'>
                            <CircularProgress />
                        </Grid>
                    : values.response ?
                            <Grid>{values.message}</Grid>
                            : null
                }
            </div>
        )


}