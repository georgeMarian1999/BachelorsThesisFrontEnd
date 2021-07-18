import React from 'react';
import Box from "@material-ui/core/Box";

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
export const TemaDetalii = (props)=>{
    return(
        <Box>
            <Dialog
                open={props.open}
                onClose={props.handleClose}
                scroll={'paper'}
            >
                <DialogTitle id="scroll-dialog-title">{props.tema.tema_titlu}</DialogTitle>
                <DialogContent dividers={'paper'}>
                    <DialogContentText
                        id="tema-description">
                        {props.tema.tema_descriere}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleClose} color="primary">
                        Dismiss
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}