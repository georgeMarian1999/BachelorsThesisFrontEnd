import React, {useState,useEffect} from "react";
import '../Stylesheet/student-dashboard.css';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import {TemaTableRow} from "./tema-table-row";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {CircularProgress} from "@material-ui/core";
import {NavBar} from "./nav-bar";
import {useStyles} from "../Stylesheet/student-styles";
import Box from '@material-ui/core/Box';
import Backdrop from "@material-ui/core/Backdrop";
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


export const TemePropuse = (props)=>{
    const classes=useStyles();
    const [open, setOpen] = React.useState(false);
    const [error,setError]=useState(false);

    const handleOpenAlert = () => {
        setOpen(true);
    };

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };


    const [loading,setLoading]=useState(false);


    const [teme,setTeme]=useState([]);
    const getTeme =async () =>{
        setLoading(true);
        var axios = require('axios');

        var config = {
            method: 'get',
            url: 'https://licenta-microservices.herokuapp.com/monolit/tema/facultate/'+JSON.parse(sessionStorage.getItem("loggeduser")).facultate_id,
            headers: { }
        };

        axios(config)
            .then(function (response) {
                setLoading(false);
                setTeme(response.data);
            })
            .catch(function (error) {
                setError(true);
                setLoading(false);
                handleOpenAlert();
                console.log(error);
            });
    }
    useEffect(()=>{
        getTeme();
    },[])
    return (
        <Box className={classes.dashboardBody}>
            <NavBar/>
            <Box className={classes.content}>
                <Box className={classes.listaTemeitem}>
                {!loading &&
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Titlul temei</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Adaugat de </TableCell>
                                <TableCell>Domeniu</TableCell>
                                <TableCell>Detalii</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {teme.map((row)=>(
                                  <TemaTableRow alert={handleOpenAlert} key={row.tema_titlu} tema={row}/>
                               ))}
                        </TableBody>
                    </Table>
                </TableContainer>}
                    {loading &&
                    <Backdrop className={classes.backdrop} open={loading} >
                        <CircularProgress color="inherit" />
                    </Backdrop>}
                </Box>
            </Box>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity="error">
                    Un serviciu este indisponibil!
                </Alert>
            </Snackbar>

        </Box>
    )
}
