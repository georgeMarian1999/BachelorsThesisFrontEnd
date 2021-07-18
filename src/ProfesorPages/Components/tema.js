import React, {useEffect, useState} from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import {useStyles} from "../Stylesheet/prof-styles";
import {CircularProgress} from "@material-ui/core";
export const Tema = (props) =>{
    const classes=useStyles();
    const [domeniu,setDomeniu]=useState({
        domeniu_id:0 ,
        domeniu_titlu: "",
        domeniu_descriere: "",
        domeniu_specializare: "",
        facultate_id: ""
    });
    useEffect(()=>{
        getDomeniu();
    },[])
    const [loading,setLoading]=useState();
    const getDomeniu = () =>{
        setLoading(true);
        var axios = require('axios');

        var config = {
            method: 'get',
            url: 'https://licenta-microservices.herokuapp.com/monolit/domeniu/'+ props.tema.domeniu_id,
            headers: { }
        };

        axios(config)
            .then(function (response) {
                setDomeniu(response.data);
                console.log(response.data);
                setLoading(false);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    return (
        <React.Fragment>
            <TableRow key={props.key} className={classes.table}>
                <TableCell>
                    {props.tema.tema_id}
                </TableCell>
                <TableCell component="th" scope="row">
                    {props.tema.tema_titlu}
                </TableCell>
                <TableCell>{props.tema.tema_status}</TableCell>
                <TableCell>
                    {!loading &&  domeniu.domeniu_titlu}
                    {loading &&<CircularProgress/>}
                </TableCell>
            </TableRow>
        </React.Fragment>
    )
}