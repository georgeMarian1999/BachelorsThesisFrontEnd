import React, {useEffect, useState} from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import '../Stylesheet/student-dashboard.css';
import {useStyles} from "../Stylesheet/student-styles";
import {CircularProgress} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {TemaDetalii} from "./tema-detalii";
export const TemaTableRow = (props) =>{
    const classes=useStyles();
    const [loadingProf,setLoadingProf]=useState(false);
    const [errorProfesor,setErrorProfesor]=useState(false);
    const [detaliiOpen,setDetaliiOpen]=useState(false);
    const handleOpenDetalii = ()=>{
        setDetaliiOpen(true);
    }
    const handleCloseDetalii = ()=>{
        setDetaliiOpen(false);
    }
    const [domeniu,setDomeniu]=useState({
        domeniu_id:0 ,
        domeniu_titlu: "",
        domeniu_descriere: "",
        domeniu_specializare: "",
        facultate_id: ""
    });
    useEffect(()=>{
        getProfesor();
        getDomeniu();
    },[])
    const getProfesor= ()=>{
        setLoadingProf(true);
        var axios = require('axios');

        var config = {
            method: 'get',
            url: 'http://licenta.com/profesor/'+props.tema.profesor_id,
            headers: { }
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                setLoadingProf(false);
                setProfesor(response.data);
            })
            .catch(function (error) {
                setLoadingProf(false);
                console.log(error);
                setErrorProfesor(true);
                props.alert();
            });

    }
    const [profesor,setProfesor]=useState({
        email: "",
        firstname: "",
        lastname: "",
        numar_locuri: "",
        titlu: "",
        facultate_id: "",
        id: ""
    });
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
                    <TableCell component="th" scope="row">
                        {props.tema.tema_titlu}
                    </TableCell>
                    <TableCell>{props.tema.tema_status}</TableCell>
                    <TableCell>
                        {!loadingProf && !errorProfesor && profesor.firstname+" "+profesor.lastname}
                        {errorProfesor && "Eroare la serviciul de profesori"}
                        {loadingProf &&<CircularProgress/>}
                    </TableCell>
                    <TableCell>
                        {!loading &&  domeniu.domeniu_titlu}
                        {loading &&<CircularProgress/>}
                    </TableCell>
                    <TableCell>
                        {!loading && <Button onClick={handleOpenDetalii}>Detalii</Button>}
                        {loading &&<CircularProgress/>}
                    </TableCell>
                </TableRow>
                <TemaDetalii open={detaliiOpen} handleClose={handleCloseDetalii} tema={props.tema}/>
            </React.Fragment>
    )
}