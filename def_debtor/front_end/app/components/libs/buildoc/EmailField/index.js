import React, {Component} from 'react'
import MaskedInput from 'react-text-mask'
import emailMask from 'text-mask-addons/dist/emailMask'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import Grid from "@material-ui/core/Grid"
import Button from '@material-ui/core/Button'
import FormHelperText from '@material-ui/core/FormHelperText'
import InputAdornment from '@material-ui/core/InputAdornment'
import Email from '@material-ui/icons/Email'
import {DATA} from '../collector'


function TextMask (props) {
    const { inputRef, ...other } = props
    return (

            <MaskedInput
                {...other}
                ref={ref => {
                    inputRef(ref ? ref.inputElement : null)
                }}
                mask={emailMask}
                placeholderChar={'\u2000'}
                showMask
            />
    )
}

export default function EmailField(props) {

    const [values, setValues] = React.useState({
                                                   textmask: '@.',
                                                   isValid: false,
                                                   helperText: false
                                               })

    const regexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    const handleChange = name => event => {
        const validateEmail = event.target.value.search(regexp)
        setValues({
            ...values,
            [name]: event.target.value,
            isValid: validateEmail > -1 ? true : false,
            helperText: false
        })
    }

    const handleBlur = () => {
        if(!values.isValid){
            setValues({
                ...values,
                helperText: true
            })
        }
    }

    const getResponse = (response) => {
        console.log(response.message)
        props.handleResponse(response.message)
    }

    const sendData = () => {
        props.handleProgress()
        const data = Object.assign(DATA, {email: values.textmask})
        google.script.run.withSuccessHandler(getResponse).getData(data)
    }

    return(
          <Grid container spacing={5} direction={'column'}>
              <Grid item xs={12}>
                  <FormControl fullWidth>
                      <InputLabel htmlFor="formatted-text-mask-input">Электронная почта</InputLabel>
                      <Input
                          value={values.textmask}
                          onChange={handleChange('textmask')}
                          onBlur={handleBlur}
                          id="formatted-text-mask-input"
                          inputComponent={TextMask}
                          autoFocus
                          fullWidth
                          startAdornment={
                              <InputAdornment position="start">
                                  <Email/>
                              </InputAdornment>
                          }
                      />
                      {values.helperText ? <FormHelperText error>Некорректный адрес</FormHelperText> : null}
                  </FormControl>
              </Grid>
              <Grid container item justify={'center'}>
                  <Button color="primary"
                          variant="contained"
                          disabled={!values.isValid}
                          onClick={sendData}
                  >
                      Получить отчет о должнике
                  </Button>
              </Grid>
           </Grid>

    )
}