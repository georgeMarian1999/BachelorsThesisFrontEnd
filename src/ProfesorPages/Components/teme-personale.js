import React, {useEffect, useState} from 'react';
import Box from "@material-ui/core/Box";
import {useStyles} from "../Stylesheet/prof-styles";
import {NavBar} from "./nav-bar";
import Backdrop from "@material-ui/core/Backdrop";
import {CircularProgress} from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import {Tema} from "./tema";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Button from "@material-ui/core/Button";
import {Alert} from "../Stylesheet/prof-styles";
import {AdaugareTemaForm} from "./adaugare-tema-form";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
export const TemePersonale = ()=>{
    const [open,setOpen]=useState(false);
    const [errorMsg,setErrorMsg]=useState('');
    const [formOpen,setFormOpen]=useState(false);
    const [openConfirmation,setOpenConfirmation]=useState(false);
    const [confirmation,setConfirmation]=useState('');
    const [loading,setLoading]=useState(false);
    const [teme,setTeme]=useState([])
    const handleCloseAlert = ()=>{
        setOpen(false);
    }
    const alertError = (msg)=>{
        handleOpenAlert(msg);
    }
    const handleOpenConfirmation = (msg)=>{
        setOpenConfirmation(true);
        setConfirmation(msg);
    }
    const handleCloseConfirmation = ()=>{
        setOpenConfirmation(false);
    }
    const handleOpenAlert = (msg)=>{
        setErrorMsg(msg);
        setOpen(true);
    }
    const handleOpenForm = ()=>{
        setFormOpen(true);
    }
    const handleCloseForm = ()=>{
        setFormOpen(false);
    }
    const refreshData = ()=>{
        getTeme();
    }
    useEffect(()=>{
        getTeme();
    },[])
    const getTeme=()=>{
        setLoading(true);
        var axios = require('axios');

        var config = {
            method: 'get',
            url: 'https://licenta-microservices.herokuapp.com/monolit/tema/profesor/'+JSON.parse(sessionStorage.getItem("loggeduser")).id,
            headers: { }
        };

        axios(config)
            .then(function (response) {
                setLoading(false);
                setTeme(response.data);
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                setLoading(false);
                if(error.response){
                if(error.response.data){
                    //alertError(error.response.data);
                }
                }
                else alertError("Serviciul de teme este indisponibil");
                console.log(error);
            });
    }
    const classes=useStyles();
    return(
        <Box className={classes.dashboardBody}>
            <NavBar/>
            {!loading &&
            <Box className={classes.content}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><Button onClick={handleOpenForm}><AddCircleIcon/></Button></TableCell>
                                <TableCell>Titlul temei</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Domeniu</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {teme.map((row)=>(
                                <Tema alert={alertError} key={row.tema_titlu} tema={row}/>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
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
            <Snackbar open={openConfirmation} autoHideDuration={6000} onClose={handleCloseConfirmation}>
                <Alert onClose={handleCloseConfirmation} severity="success">
                    {confirmation}
                </Alert>
            </Snackbar>
            <AdaugareTemaForm confirm={handleOpenConfirmation} refreshData={refreshData} open={formOpen} closeForm={handleCloseForm} alertError={alertError}/>

        </Box>
    );
}