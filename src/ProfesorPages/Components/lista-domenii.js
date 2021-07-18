import React from "react";
import Box from "@material-ui/core/Box";
import {useStyles} from "../Stylesheet/prof-styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableBody from "@material-ui/core/TableBody";
import {Domeniu} from "./domeniu";
export const ListaDomenii = (props)=> {
    const classes = useStyles();
    return (
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
                                {props.domenii.map((row) => (
                                    <Domeniu confirm={props.alertConfirm} alert={props.alertError} key={row.domeniu_titlu} domeniu={row}
                                                     refreshData={props.refreshData}/>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
    )
}