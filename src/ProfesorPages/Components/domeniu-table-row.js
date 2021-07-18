import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import {useStyles} from "../Stylesheet/prof-styles";
import Button from "@material-ui/core/Button";
export const DomeniuTableRow = (props) =>{
    const classes=useStyles();
    const renuntaInteres = ()=>{
        var axios = require('axios');
        var data = JSON.stringify({
            "profesor_id": JSON.parse(sessionStorage.getItem("loggeduser")).id,
            "domeniu_id": props.domeniu.domeniu_id
        });

        var config = {
            method: 'delete',
            url: 'https://licenta-microservices.herokuapp.com/monolit/interes/remove',
            headers: {
                'Content-Type': 'application/json'
            },
            data : data
        };

        axios(config)
            .then(function (response) {
                props.refreshData();
            })
            .catch(function (error) {
                console.log(error);
                props.alert("Eroare la serviciul de interes "+error.response);
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
                    <Button onClick={renuntaInteres} className={classes.renuntaButton}>
                        Renunta la interes
                    </Button>
                </TableCell>
            </TableRow>
        </React.Fragment>
    )
}