import React, {useEffect, useState} from 'react';
import {NavBar} from "./nav-bar";
import Box from '@material-ui/core/Box';
import Snackbar from "@material-ui/core/Snackbar";
import {Colaborare} from "./colaborare";
import {useStyles} from "../Stylesheet/prof-styles";
import Backdrop from "@material-ui/core/Backdrop";
import {CircularProgress, Paper} from "@material-ui/core";
import {Alert} from "../Stylesheet/prof-styles";
export const Colaborari = (props) =>{
    const [open,setOpen]=useState(false);
    const [errorMsg,setErrorMsg]=useState('');
    const [colaborari,setColaborari]=useState([]);
    const [status,setStatus]=useState('');
    const [colaborariFiltered,setColaborariFiltered]=useState([]);
    const [locuri,setLocuri]=useState(0);
    const [loading,setLoading]=useState(false);
    const handleCloseAlert = ()=>{
        setOpen(false);
    }
    const onChangeStatus = (e)=>{
        setStatus(e.target.value);
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

        getCrtUserCol();

    }
    const getLocuri = ()=>{
        //setLoading(true);
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
    const getCrtUserCol= () =>{
        setLoading(true);
        var axios = require('axios');

        var config = {
            method: 'get',
            url: 'http://licenta.com/colaborare/profesor/'+JSON.parse(sessionStorage.getItem("loggeduser")).id,
            headers: {
            }
        };

        axios(config)
            .then(function (response) {
                setColaborari(response.data);
                setColaborariFiltered(response.data);
                getLocuri();
                //setLoading(false);
            })
            .catch(function (error) {
                //setLoading(false);
                getLocuri();
                if(error.response){
                    alertError(error.response.data);
                }
                else alertError("Serviciul de colaborari este indisponibil");
                console.log(error);
            });
    }
    useEffect(()=>{
        if(status!=='')
        setColaborariFiltered(colaborari.filter(function(el){
            return el.status===status;
        }))
        else setColaborariFiltered(colaborari);
    },[status])
    const classes=useStyles();
    return(
        <Box className={classes.dashboardBody}>
            <NavBar/>
            {!loading &&

            <Box className={classes.content}>
                <h2>Colaborari acceptate</h2>
                <Box className={classes.colaborariFilter}>
                    <Paper className={classes.card}>
                        Locuri disponibile :{locuri}
                        {locuri===0 &&<h6> Mai adaugati locuri ca sa puteti accepta cereri </h6>}
                    </Paper>
                    {/*<Paper>*/}
                    {/*<FormControl variant="outlined" className={classes.formControl}>*/}
                    {/*    <InputLabel id="demo-simple-select-outlined-label">Status</InputLabel>*/}
                    {/*    <Select*/}
                    {/*        labelId="demo-simple-select-outlined-label"*/}
                    {/*        id="demo-simple-select-outlined"*/}
                    {/*        value={status}*/}
                    {/*        onChange={onChangeStatus}*/}
                    {/*        label="Status"*/}
                    {/*    >*/}
                    {/*        <MenuItem value="">*/}
                    {/*            <em>None</em>*/}
                    {/*        </MenuItem>*/}
                    {/*        <MenuItem value={'ACCEPTATA'}>Acceptata</MenuItem>*/}
                    {/*        <MenuItem value={'REFUZATA'}>Refuzata</MenuItem>*/}
                    {/*        <MenuItem value={'REVIZUIRE'}>Revizuire</MenuItem>*/}
                    {/*    </Select>*/}
                    {/*</FormControl>*/}
                    {/*</Paper>*/}
                </Box>
                <Box>
                    {colaborariFiltered.map((colaborare)=>(
                        <Colaborare locuri={locuri} refreshData={refreshData} colaborare={colaborare} alertError={alertError}/>
                    ))}
                </Box>
            </Box>
            }
            {loading &&
            <Backdrop className={classes.backdrop} open={loading}>
                <CircularProgress color="inherit"/>
            </Backdrop>}
            <Snackbar open={open} autoHideDuration={6000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity="error">
                    {errorMsg}
                </Alert>
            </Snackbar>
        </Box>
    )
}