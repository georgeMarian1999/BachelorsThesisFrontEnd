import React, {useEffect, useState} from "react";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Shake from 'react-reveal/Shake';
import '../Stylesheet/login-page.css';
import Box from "@material-ui/core/Box";
import CircularProgress from '@material-ui/core/CircularProgress';
import {Input,Button,InputLabel} from "@material-ui/core";
import {useStyles} from "../Stylesheet/login-page-styles";
export const LoginPage = (props)=>{
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState(false);
    const [errorMessage,setErrorMessage]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const classes=useStyles();

    const onChangeEmail = (e) =>{
        setEmail(e.target.value);
    }
    const onChangePassword = (e)=>{
        setPassword(e.target.value);
    }
    const goToProfLogin= ()=>{
        props.history.push('/loginprof');
    }
    const onLogin = async ()=>{
        setLoading(true);
        var axios = require('axios');
        var data = JSON.stringify({
            "email": email,
            "password": password,
        });
        console.log(data);
        var config = {
            method: 'post',
            url: 'http://licenta.com/users/signin',
            headers: {
                'Content-Type': 'application/json',
            },
            data : data
        };

        await axios(config)
            .then(function (response) {
                setLoading(false);
                console.log(response);
                sessionStorage.setItem("loggeduser",JSON.stringify(response.data));
                props.history.push('/student');
            })
            .catch(function (error) {
                setLoading(false);
                setError(true);
                if(error.response){
                if(error.response.data.errors) {
                    setErrorMessage(error.response.data.errors[0].message);
                }}
                else setErrorMessage("Serviciul de autentificare nu functioneaza momentan")
            });


    }
    return(
        <Box className={classes.loginBody}>
                <Box className={classes.formWrapper}>
                    <h3>Student login</h3>
                    <form className="form">
                        <div className="inputfield">
                            <InputLabel htmlFor="email">Email</InputLabel>
                            <Input
                                id="email"
                                type={'text'}
                                fullWidth
                                onChange={onChangeEmail}
                                placeholder="example@stud.ubbcluj.ro"
                            />
                        </div>
                        <div className="inputfield">
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input
                                id="password"
                                type={'password'}
                                fullWidth
                                onChange={onChangePassword}
                            />
                        </div>
                        <Box className={classes.buttonWrapper}>
                            <Button
                                className={classes.button}
                                onClick={onLogin}
                                variant="contained"
                                color="primary"
                                size="large"
                                disabled={email===''||password===''}
                                fullWidth
                                startIcon={<ExitToAppIcon/>}>
                                Login
                            </Button>
                            <Button
                                className={classes.profLoginButton}
                                onClick={goToProfLogin}
                                variant="contained"
                                size="large"
                                fullWidth
                                startIcon={<ExitToAppIcon/>}>
                                Not student? Login as teacher
                            </Button>
                            {loading && <CircularProgress size={24} className="buttonProgress" />}
                            {error && <Shake>
                                <h4 style={{color:'red'}}>{errorMessage} </h4>
                            </Shake>}
                        </Box>
                    </form>
                </Box>
        </Box>
    )
}