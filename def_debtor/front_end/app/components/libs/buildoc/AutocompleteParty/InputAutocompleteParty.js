import React from "react";
import PropTypes from "prop-types";
import Downshift from "downshift";
import { withStyles } from "@material-ui/core/styles";
import FormControl from '@material-ui/core/FormControl';
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import ListItem from "@material-ui/core/ListItem";
import uuid from 'uuid'
import suggestions from '../ddata/dadataNew'
import {PARTY, tokenDadata} from '../constans'
import collector, {DATA} from '../collector'

function renderInput(inputProps) {
    const { InputProps, classes, ref, ...other } = inputProps;
    return (
        <FormControl fullWidth>
            <TextField
                variant="outlined"
                label="Сведения о должнике"
                value='rty'
                InputProps={{
                    inputRef: ref,
                    classes: {
                        root: classes.inputRoot,
                        input: classes.inputInput
                    },
                    ...InputProps
                }}
                {...other}
            />
        </FormControl>
    );
}

function renderSuggestion({
                              suggestion,
                              index,
                              itemProps,
                              highlightedIndex,
                              selectedItem
                          }) {
    const isHighlighted = highlightedIndex === index;
    const isSelected = (selectedItem || "").indexOf(suggestion.label) > -1;

    return (
        <ListItem
            {...itemProps}
            key={uuid.v4()}
            selected={isHighlighted}
            component="div"
            style={{
                fontWeight: isSelected ? 500 : 400,
                whiteSpace: 'normal'
            }}
        >
            {suggestion.label}
        </ListItem>
    );
}
renderSuggestion.propTypes = {
    highlightedIndex: PropTypes.number,
    index: PropTypes.number,
    itemProps: PropTypes.object,
    selectedItem: PropTypes.string,
    suggestion: PropTypes.shape({ label: PropTypes.string }).isRequired
};

let arrSuggestions

function onSugestionsLoaded (arr){
    this.setState({arr})
}

function getSuggestions(value) {
    arrSuggestions = suggestions(value, PARTY, tokenDadata)
    return getLabels(arrSuggestions, PARTY)
}



let index

function setIndex(e) {
    if(e.highlightedIndex !== null) index = e.highlightedIndex
}

function collectParty(){
    collector(DATA[index])
}

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    container: {
        flexGrow: 1,
        position: "relative"
    },
    paper: {
        position: "absolute",
        zIndex: 1,
        marginTop: theme.spacing(),
        left: 0,
        right: 0
    },
    inputRoot: {
        flexWrap: "wrap"
    },
    inputInput: {
        width: "auto",
        flexGrow: 1
    },

})



class InputAutocompleteParty extends React.Component{

    constructor(props) {
        super(props)
        this.state = {
            suggestions: []
        }
        this.onSuggestionsLoaded = this.onSuggestionsLoaded.bind(this)
        this.updateSuggestion = this.updateSuggestion.bind(this)
    }





    onSuggestionsLoaded (suggestions){
        this.setState({suggestions})
    }

    updateSuggestion (event){
        if (!event.target.value) {
            return
        }

        suggestions(event.target.value, PARTY, tokenDadata).then(this.onSuggestionsLoaded)
    }

    render(){
        const { classes,
            hideFieldEmail,
            openFieldEmail,
            hideFieldOrg,
            setSelected,
            kindOfParty
        } = this.props

        const {suggestions} = this.state
    return (
        <Downshift id="downshift-simple"
                   onSelect={(selected) => {
                       collectParty()
                       hideFieldEmail()
                       openFieldEmail()
                       hideFieldOrg()
                       setSelected(selected)
                   }}

                   onStateChange={setIndex}
        >
            {({
                  getInputProps,
                  getItemProps,
                  getMenuProps,
                  highlightedIndex,
                  inputValue,
                  isOpen,
                  selectedItem
              }) => (
                <div className={classes.container}>
                    {renderInput({
                        fullWidth: true,
                        classes,
                        InputProps: getInputProps({
                            placeholder: "Начните вводить наименование (или ИНН/ОГРН) организации",
                            onChange: this.updateSuggestion
                        })
                    })}
                    <div {...getMenuProps()}>
                        {isOpen ? (
                            <Paper className={classes.paper} square>
                                {
                                    suggestions.map((suggestion, index) =>
                                    renderSuggestion({
                                        suggestion,
                                        index,
                                        itemProps: getItemProps({ item: suggestion.label }),
                                        highlightedIndex,
                                        selectedItem
                                    })
                                )}

                            </Paper>
                        ) : null}
                    </div>
                </div>
            )}
        </Downshift>

    )
    }

}

InputAutocompleteParty.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(InputAutocompleteParty);