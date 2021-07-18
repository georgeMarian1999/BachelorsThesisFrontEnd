import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import {TemaTableRow} from "./tema-table-row";
import Backdrop from "@material-ui/core/Backdrop";
import Box from "@material-ui/core/Box";
import {CircularProgress} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {useStyles} from "../Stylesheet/student-styles";
import {Domeniu} from "./domeniu";

export const DomeniiProfesor = (props)=>{
    const classes=useStyles();
    const [loading,setLoading]=useState(false);
    const [domenii,setDomenii]=useState([]);
    const [error,setError]=useState(false);
    const [errorMsg,setErrorMsg]=useState('');

    useEffect(()=>{
        setError(false);
        getDomenii();
    },[])
    const getDomenii=()=>{

        setLoading(true);
        var axios = require('axios');

        var config = {
            method: 'get',
            url: 'https://licenta-microservices.herokuapp.com/monolit/interes/'+props.id,
            headers: { }
        };
        console.log(config.url);
        axios(config)
            .then(function (response) {
                setLoading(false);
                setDomenii(response.data);
            })
            .catch(function (error) {
                setLoading(false);
                setError(true);
                if(error.response!==undefined)
                    setErrorMsg(error.response.data);
                else setErrorMsg("Eroare la serviciul de domenii")
                console.log(error.response);
                //props.isError("Serviciul de domenii este indisponibil");
            });

    }
    return(
        <Box>
        {!loading &&
    <TableContainer component={Paper}>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Titlul domeniului</TableCell>
                    <TableCell>Descrierea domeniului</TableCell>
                    <TableCell>Specializarea domeniului </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {domenii.length!==0 &&domenii.map((row)=>(
                    <Domeniu key={row.domeniu_titlu} domeniu={row}/>
                ))}

                {error && <h5>{errorMsg}</h5>}
            </TableBody>
        </Table>
    </TableContainer>}
    {loading &&
        <CircularProgress color="inherit" />
   }
</Box>
    )
}