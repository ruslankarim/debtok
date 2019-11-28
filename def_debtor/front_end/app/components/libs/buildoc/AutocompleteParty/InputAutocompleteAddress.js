import React from "react";
import PropTypes from "prop-types";
import Downshift from "downshift";
import { withStyles } from "@material-ui/core/styles";
import FormControl from '@material-ui/core/FormControl';
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import ListItem from "@material-ui/core/ListItem";
import Grid from "@material-ui/core/Grid";
import suggestions, {getLabels} from '../ddata'
import {ADDRESS, tokenDadata} from '../constans'
import uuid from 'uuid'
import Check from '@material-ui/icons/Check'


function renderInput(inputProps) {
    const { InputProps, classes, ref, label, ...other } = inputProps;
    return (
        <FormControl fullWidth>
            <TextField
                variant="outlined"
                label={label}
                autoFocus
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

function getSuggestions(value, valueinput) {
    const arrOfSuggestions = suggestions(value.replace(valueinput, ''), ADDRESS, tokenDadata)
    return getLabels(arrOfSuggestions, ADDRESS)
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
        marginTop: theme.spacing.unit,
        left: 0,
        right: 0
    },
    chip: {
        margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`
    },
    inputRoot: {
        flexWrap: "wrap"
    },
    inputInput: {
        width: "auto",
        flexGrow: 1
    },
    divider: {
        height: theme.spacing.unit * 2
    }
})


function InputAutocompleteAddress(props) {
    const { classes, valueinput, label, setSelected, selected, hideFieldAddressEntrepreneur, kindOfParty} = props;

    return (
        <Grid container spacing={16}>
            <Grid item xs={10}>
                <Downshift id="downshift-simple" initialInputValue = {valueinput}
                           onSelect={(e) => {
                               let dropAddress = selected.split('Адрес: ')[0]
                               setSelected(`${dropAddress} Адрес: ${e}`)
                               DATA[kindOfParty].data.address.value = e
                        }}>
                    {({
                          getInputProps,
                          getItemProps,
                          getMenuProps,
                          highlightedIndex,
                          inputValue,
                          isOpen,
                          selectedItem,
                      }) => (
                        <div className={classes.container}>
                            {renderInput({
                                label,
                                fullWidth: true,
                                classes,
                                InputProps: getInputProps({

                                })
                            })}
                            <div {...getMenuProps()}>
                                {isOpen ? (
                                    <Paper className={classes.paper} square>
                                        {getSuggestions(inputValue).map((suggestion, index) =>
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
            </Grid>
            <Grid container item xs={2} alignItems='center'>
                <Check style={{cursor: 'pointer'}}
                       onClick={()=>{
                           hideFieldAddressEntrepreneur()
                       }}
                />
            </Grid>
        </Grid>
    )
}

InputAutocompleteAddress.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(InputAutocompleteAddress);