import React, {useEffect, useState} from 'react';
import {NavBar} from "./nav-bar";
import {Colaborare} from "./colaborare";
import {useStyles} from "../Stylesheet/student-styles";
import Box from '@material-ui/core/Box';
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export const ColaborareAcceptata = (props) =>{
    const [open,setOpen]=useState(false);
    const [errorMsg,setErrorMsg]=useState('');
    const [url,setUrl]=useState('http://licenta.com/colaborare/student/');
    const handleCloseAlert = ()=>{
        setOpen(false);
    }
    const handleOpenAlert = (msg)=>{
        setErrorMsg(msg);
        setOpen(true);
    }

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