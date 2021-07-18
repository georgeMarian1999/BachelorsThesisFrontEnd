import React, {useEffect, useState} from "react";
import Box from "@material-ui/core/Box";
import {useStyles} from "../Stylesheet/prof-styles";
import {NavBar} from "./nav-bar";
import Backdrop from "@material-ui/core/Backdrop";
import {CircularProgress} from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import {Alert} from "../Stylesheet/prof-styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import {DomeniuTableRow} from "./domeniu-table-row";

export const ListaDomeniiPersonale = ()=>{
    const classes=useStyles();
    const [loading,setLoading]=useState(false);
    const [domenii,setDomenii]=useState([]);
    const [errorMsg,setErrorMsg]=useState('');
    const [open,setOpen]=useState(false);
    const alertError = (msg)=>{
        setOpen(true);
        setErrorMsg(msg);
    }
    const handleCloseAlert = ()=>{
        setOpen(false);
    }
    useEffect(()=>{
        getDomeniiPersonale();
    },[])
    const refreshData =()=>{
        getDomeniiPersonale();
    }
    const getDomeniiPersonale =()=>{
        setLoading(true);
        var axios = require('axios');

        var config = {
            method: 'get',
            url: 'https://licenta-microservices.herokuapp.com/monolit/interes/'+JSON.parse(sessionStorage.getItem("loggeduser")).id,
            headers: { }
        };

        axios(config)
            .then(function (response) {
                setLoading(false);
                setDomenii(response.data);
            })
            .catch(function (error) {
                setLoading(false)
                if(error.response)
                    alertError(error.response.data);
                else alertError("Serviciul de domenii este indisponibil");
            });

    }
    return(
        <Box className={classes.dashboardBody}>
            <NavBar/>
            {!loading &&
            <Box className={classes.content}>
                <Box>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Titlul domeniului</TableCell>
                                    <TableCell>Descrierea domeniului</TableCell>
                                    <TableCell>Specializarea domeniului </TableCell>
                                    <TableCell>Actiune</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {domenii.map((row)=>(
                                    <DomeniuTableRow alert={alertError} key={row.domeniu_titlu} domeniu={row} refreshData={refreshData}/>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

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