import React,{useState} from "react";
import {Transition} from "../Stylesheet/student-styles";

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {DomeniiProfesor} from "./domenii-profesor";

export const DomeniiDialog = (props)=>{
    const [error,setError]=useState(false);
    const newError = (msg)=>{
        props.newError(msg)
    }
    return(
        <Dialog
        open={props.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={props.handleCloseDialog}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
    >
        <DialogTitle id="alert-dialog-slide-title">Domeniile de interes al profesorului {props.profesor.firstname+" "+props.profesor.lastname}</DialogTitle>
        <DialogContent>
           <DomeniiProfesor isError={newError} id={props.profesor_id}/>
        </DialogContent>
        <DialogActions>
            <Button onClick={props.handleCloseDialog} color="primary">
                Dismiss
            </Button>
        </DialogActions>
    </Dialog>)
}