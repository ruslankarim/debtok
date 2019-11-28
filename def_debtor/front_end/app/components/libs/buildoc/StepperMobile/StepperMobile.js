import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import Autocomplete from '../AutocompleteParty'
import Contract from "../Contract";

const questions = [
    'party',
    'contract',

]





const styles = {
    root: {
        maxWidth: 550,
        flexGrow: 1,
    }
}

class ProgressMobileStepper extends React.Component {
    state = {
        activeStep: 0,
    }

    handleNext = () => {
        this.setState(state => ({
            activeStep: state.activeStep + 1,
        }))
    }

    handleBack = () => {
        this.setState(state => ({
            activeStep: state.activeStep - 1,
        }))

    }

    render() {
        const { classes, theme, currentQuest } = this.props
        return (
            <div>
                {questions[this.state.activeStep] === 'party' ?
                    <Autocomplete/> : questions[this.state.activeStep] === 'contract' ?
                        <Contract/> : null
                }
            <MobileStepper

                steps={6}
                position="static"
                activeStep={this.state.activeStep}
                className={classes.root}
                nextButton={
                    <Button variant='text' onClick={this.handleNext} disabled={this.state.activeStep === 5} className={classes.button}>
                        Следующий
                        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                    </Button>
                }
                backButton={
                    <Button onClick={this.handleBack} disabled={this.state.activeStep === 0}>
                        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                        Предыдущий
                    </Button>
                }
            />
            </div>
        );
    }
}

ProgressMobileStepper.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(ProgressMobileStepper);
