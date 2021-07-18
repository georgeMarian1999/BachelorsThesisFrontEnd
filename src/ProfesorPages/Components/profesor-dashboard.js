import React, {useEffect, useState} from "react";
import {NavBar} from "./nav-bar";
import Box from '@material-ui/core/Box';
import {Alert, useStyles} from "../Stylesheet/prof-styles";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Backdrop from "@material-ui/core/Backdrop";
import {CircularProgress} from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import {ListaDomenii} from "./lista-domenii";
import TextField from "@material-ui/core/TextField";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import {AdaugareLocuriForm} from "./adaugare-locuri-form";
import Button from "@material-ui/core/Button";
export const ProfesorDashboard = (props)=>{
    const classes=useStyles();
    const [open,setOpen]=useState(false);
    const [addLocuriFormOpen,setaddLocuriFormOpen]=useState(false);
    const [errorMsg,setErrorMsg]=useState('');
    const [locuri,setLocuri]=useState(0);
    const [openConfirmation,setOpenConfirmation]=useState(false);
    const [confirmation,setConfirmation]=useState('');
    const [loading,setLoading]=useState(false);
    const [searchDomeniu,setSearchDomeniu]=useState('');
    const [domeniiFiltered,setDomeniiFiltered]=useState([]);
    const [loadingDomenii,setLoadingDomenii]=useState(false);
    const [domenii,setDomenii]=useState([]);
    const onChangeName = (e)=>{
        setSearchDomeniu(e.target.value);
    }
    const handleOpenForm= ()=>{
        setaddLocuriFormOpen(true);
    }
    const handleCloseForm = ()=>{
        setaddLocuriFormOpen(false);
    }
    const getDomenii =()=>{
        setLoading(true);
        var axios = require('axios');

        var config = {
            method: 'get',
            url: 'https://licenta-microservices.herokuapp.com/monolit/interes/not/'+JSON.parse(sessionStorage.getItem("loggeduser")).id+"/"+JSON.parse(sessionStorage.getItem("loggeduser")).facultate_id,
            headers: { }
        };
        axios(config)
            .then(function (response) {
                getLocuri();
                setDomenii(response.data);
                setDomeniiFiltered(response.data);

            })
            .catch(function (error) {

                getLocuri()
                alertError("Serviciul de domenii este indisponibil");
                console.log(error);
            });

    }
    const handleCloseAlert = ()=>{
        setOpen(false);
    }
    const handleCloseConfirmation = () =>{
        setOpenConfirmation(false);
    }
    const alertConfirmation = (msg)=>{
        setOpenConfirmation(true);
        setConfirmation(msg);
    }
    const alertError = (msg)=>{
        handleOpenAlert(msg);
    }
    const handleOpenAlert = (msg)=>{
        setErrorMsg(msg);
        setOpen(true);
    }
    useEffect(()=>{
        refreshData();
    },[])
    const refreshData = ()=>{
        getDomenii();

    }
    useEffect(()=>{
        setDomeniiFiltered(domenii.filter(function (el){
            return el.domeniu_titlu.includes(searchDomeniu,0) || el.domeniu_titlu.includes(searchDomeniu.toUpperCase(),0);
        }))
    },[searchDomeniu])
    const getLocuri = ()=>{
        var axios = require('axios');

        var config = {
            method: 'get',
            url: 'http://licenta.com/profesor/locuri/'+JSON.parse(sessionStorage.getItem("loggeduser")).id,
            headers: { }
        };

        axios(config)
            .then(function (response) {
               setLocuri(response.data);
               setLoading(false);
            })
            .catch(function (error) {
                setLoading(false);
                if(error.response){
                if(error.response.data.errors!==undefined){
                    alertError(error.response.data.errors[0].message);
                }}
                else alertError("Serviciul de profesori este indisponibil");
            });
    }

    return (
        <Box className={classes.dashboardBody}>
            <NavBar/>
            <Box className={classes.content}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <Box className={classes.card}>
                        Welcome {JSON.parse(sessionStorage.getItem("loggeduser")).firstname+" "+JSON.parse(sessionStorage.getItem("loggeduser")).lastname}
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Paper className={classes.card}>Locuri disponibile: {locuri}<Button onClick={handleOpenForm} ><AddCircleIcon/></Button></Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Box className={classes.card}>
                            Email:  {JSON.parse(sessionStorage.getItem("loggeduser")).email}
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Paper className={classes.card}>Titlu:{JSON.parse(sessionStorage.getItem("loggeduser")).titlu}</Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                                   id="standard-search"
                                   label="Search by name"
                                   onChange={onChangeName}
                                   type="search" />
                        <Box className={classes.card}>
                            <h5>Lista cu domenii in care nu sunteti interesat</h5>
                            {!loading &&
                            <ListaDomenii alertConfirm={alertConfirmation} alertError={alertError} domenii={domeniiFiltered} refreshData={refreshData}/>}
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            {loading &&
            <Backdrop className={classes.backdrop} open={loading}>
                <CircularProgress color="inherit"/>
            </Backdrop>}
            <AdaugareLocuriForm refreshData={refreshData} handleClose={handleCloseForm} open={addLocuriFormOpen} alert={alertError} confirm={alertConfirmation} />
            <Snackbar open={open} autoHideDuration={6000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity="error">
                    {errorMsg}
                </Alert>
            </Snackbar>
            <Snackbar open={openConfirmation} autoHideDuration={6000} onClose={handleCloseConfirmation}>
                <Alert onClose={handleCloseConfirmation} severity="success">
                    {confirmation}
                </Alert>
            </Snackbar>
        </Box>
    )
}