import React, {useEffect, useState} from 'react';
import {NavBar} from "./nav-bar";
import {useStyles} from "../Stylesheet/student-styles";
import Box from '@material-ui/core/Box';
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import {ColaborareRefuzata} from "./colaborare-refuzata";
import Backdrop from "@material-ui/core/Backdrop";
import {CircularProgress} from "@material-ui/core";
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export const ColaborariRefuzate = (props) =>{
    const [open,setOpen]=useState(false);
    const [loading,setLoading]=useState(false);
    const [colaborari,setColaborari]=useState([]);
    const [errorMsg,setErrorMsg]=useState('');
    const handleCloseAlert = ()=>{
        setOpen(false);
    }
    useEffect(()=>{
        getColaborari();
    },[])
    const handleOpenAlert = (msg)=>{
        setErrorMsg(msg);
        setOpen(true);
    }
    const getColaborari = ()=>{
        var axios = require('axios');

        var config = {
            method: 'get',
            url: 'http://licenta.com/colaborare/refuzate/'+JSON.parse(sessionStorage.getItem("loggeduser")).student_id,
            headers: { }
        };

        axios(config)
            .then(function (response) {
                setColaborari(response.data);
            })
            .catch(function (error) {

                    if(error.response.data.errors){
                    handleOpenAlert(error.response.data.errors[0].message);
                }
                else handleOpenAlert("Serviciul de colaborari este indisponibil");
            });

    }
    const classes=useStyles();
    return(
        <Box className={classes.dashboardBody}>
            <Box className={classes.content}>
                <NavBar/>
                <Box>
                    {colaborari.map((colaborare)=>(
                        <ColaborareRefuzata key={colaborare.id} colaborare={colaborare} alertError={handleOpenAlert}/>
                    ))}
                </Box>
            </Box>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity="error">
                    {errorMsg}
                </Alert>
            </Snackbar>
            {loading &&
            <Backdrop className={classes.backdrop} open={loading} >
                <CircularProgress color="inherit" />
            </Backdrop>}
        </Box>
    )
}