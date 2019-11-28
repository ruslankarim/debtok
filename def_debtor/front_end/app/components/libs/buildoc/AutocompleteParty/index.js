import React, {Component} from "react";
import Grid from "@material-ui/core/Grid"
import TextField from '@material-ui/core/TextField'
import InputAutocompleteParty from "./InputAutocompleteParty"
import EmailField from "../EmailField"
import Selected from './Selected'



class AutocompleteDadataParty extends Component{

    state = {
        isOpenFieldEmail: false,
        isOpenFieldOrg: true,
        selected: '',
        itemsOfSelect: []

    }


    openFieldEmail = () => {

            this.setState({
                isOpenFieldEmail: true
            })
    }

    hideFieldEmail = () => {
            this.setState({
                isOpenFieldEmail: false
            })
    }

    openFieldOrg = () => {
        this.setState({
            isOpenFieldOrg: true
        })
    }

    hideFieldOrg = () => {
        this.setState({
            isOpenFieldOrg: false
        })
    }

    setSelected = (selected) => {
        this.setState({
            selected: selected
        })
    }

    setItemsOfSelect = (arr) => {
        this.setState({
            itemsOfSelect: arr
        })
    }

    render(){
        const {
            isOpenFieldEmail,
            isOpenFieldOrg,
            selected,
        } = this.state

        const {handleProgress, handleResponse} = this.props


        return(
                <Grid container spacing={10}>
                    <Grid item xs={12}>
                        {isOpenFieldOrg ?
                            <InputAutocompleteParty
                                setItemsOfSelect={this.setItemsOfSelect}
                                setAddressEntrepreneur={this.setAddressEntrepreneur}
                                setSelected={this.setSelected}
                                openFieldOrg={this.openFieldOrg}
                                hideFieldOrg={this.hideFieldOrg}
                                openFieldEmail={this.openFieldEmail}
                                hideFieldEmail={this.hideFieldEmail}

                            /> :
                            <Selected
                                selected={selected}
                                openFieldOrg={this.openFieldOrg}
                                hideFieldEmail={this.hideFieldEmail}

                            />}
                    </Grid>
                    <Grid item xs={12}>
                    {
                        isOpenFieldEmail ?
                            <EmailField handleProgress={handleProgress} handleResponse={handleResponse}/> :
                            null
                    }
                    </Grid>
                </Grid>
        )
    }
}

export default AutocompleteDadataParty

