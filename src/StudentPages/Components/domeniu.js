import React from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import {CircularProgress} from "@material-ui/core";
import {useStyles} from "../Stylesheet/student-styles";




export const Domeniu = (props)=>{
    const classes=useStyles();
    return(
        <React.Fragment>
            <TableRow key={props.key} className={classes.table}>
                <TableCell component="th" scope="row">
                    {props.domeniu.domeniu_titlu}
                </TableCell>
                <TableCell>{props.domeniu.domeniu_descriere}</TableCell>
                <TableCell>
                    {props.domeniu.domeniu_specializare}
                </TableCell>
            </TableRow>
        </React.Fragment>
    )
}