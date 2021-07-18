import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import {useStyles} from "../Stylesheet/prof-styles";
import Button from "@material-ui/core/Button";
export const Domeniu = (props) =>{
    const classes=useStyles();
    const adaugaInteres = ()=>{
        var axios = require('axios');
        var data = JSON.stringify({
            "profesor_id": JSON.parse(sessionStorage.getItem("loggeduser")).id,
            "domeniu_id": props.domeniu.domeniu_id
        });

        var config = {
            method: 'post',
            url: 'https://licenta-microservices.herokuapp.com/monolit/interes/add',
            headers: {
                'Content-Type': 'application/json'
            },
            data : data
        };

        axios(config)
            .then(function (response) {
                props.refreshData();
                props.confirm("Interes adaugat cu succes");
            })
            .catch(function (error) {
                console.log(error);
                if(error.response)
                    props.alert(error.response.data);
                else props.alert("Eroare la serviciul de interse")
            });

    }
    return (
        <React.Fragment>
            <TableRow key={props.key} className={classes.table}>
                <TableCell component="th" scope="row">
                    {props.domeniu.domeniu_titlu}
                </TableCell>
                <TableCell>{props.domeniu.domeniu_descriere}</TableCell>
                <TableCell>
                    {props.domeniu.domeniu_specializare}
                </TableCell>
                <TableCell>
                    <Button onClick={adaugaInteres} className={classes.adaugaButton}>
                       Adauga interes
                    </Button>
                </TableCell>
            </TableRow>
        </React.Fragment>
    )
}