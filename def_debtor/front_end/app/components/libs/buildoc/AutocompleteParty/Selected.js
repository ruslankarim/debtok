import React, {Component} from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from "@material-ui/core/Grid"
import DeleteOutlined from '@material-ui/icons/DeleteOutlined'
import {clearData, DATA} from '../collector'
import Fab from '@material-ui/core/Fab'
import DeleteIcon from '@material-ui/icons/Delete'
import Tooltip from "@material-ui/core/Tooltip";

const styles = theme => ({
    icon: {
        cursor: pointer,
    },
    input: {
        display: 'none',
    },
})




class Selected extends Component {
    clearData = () => {
        clearData()
        console.log(DATA)
    }
    render(){
        const {selected, openFieldOrg, hideFieldEmail} = this.props
        const falled = selected.split(', ')
        const nameParty = falled[0]
        const inn = falled[1]
        const ogrn = falled[2]
        let address = ''
        let nameTop = ''
        if(falled[3].indexOf('Адрес') > 0){
            address = 'Адрес: ' + selected.split('Адрес: ')[1]
        }else{
            nameTop = falled[3]
            address = 'Адрес: ' + selected.split('Адрес: ')[1]
        }

        return (
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="h5">
                    {nameParty}
                    </Typography>
                </Grid>
                <Grid item xs={10}>
                    <Typography variant="body1">
                        {inn}
                     </Typography>
                    <Typography variant="body1">
                        {ogrn}
                    </Typography>
                    <Typography variant="body1">
                        {nameTop}
                    </Typography>
                    <Typography variant="body1">
                        {address}
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    <Tooltip title="Изменить должника" placement="left-start">
                        <Fab color='secondary'>
                            <DeleteOutlined style={{cursor: 'pointer'}}
                                            onClick={() => {
                                                openFieldOrg()
                                                hideFieldEmail()
                                                this.clearData()
                                            }}
                            />
                        </Fab>
                    </Tooltip>
                </Grid>
            </Grid>
        )
    }
}

export default Selected
