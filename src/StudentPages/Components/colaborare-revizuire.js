import React, {useEffect, useState} from 'react';
import {NavBar} from "./nav-bar";
import {useStyles} from "../Stylesheet/student-styles";
import Box from '@material-ui/core/Box';
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import {Colaborare} from "./colaborare";
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export const ColaborareRevizuire = (props) =>{
    const [open,setOpen]=useState(false);
    const [errorMsg,setErrorMsg]=useState('');
    const handleCloseAlert = ()=>{
        setOpen(false);
    }
    const handleOpenAlert = (msg)=>{
        setErrorMsg(msg);
        setOpen(true);
    }
    const url="http://licenta.com/colaborare/revizuire/";
    const classes=useStyles();
    return(
        <Box className={classes.dashboardBody}>
            <Box className={classes.content}>
                <NavBar/>
                <Box>
                    <Colaborare url={url} alert={handleOpenAlert}/>
                </Box>
            </Box>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity="error">
                    {errorMsg}
                </Alert>
            </Snackbar>
        </Box>
    )
}