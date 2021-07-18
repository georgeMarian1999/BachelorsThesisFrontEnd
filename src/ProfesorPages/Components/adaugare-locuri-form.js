import React,{useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Box from "@material-ui/core/Box";
import {Transition} from "../Stylesheet/prof-styles";
import TextField from "@material-ui/core/TextField";
export const AdaugareLocuriForm =(props)=>{
    const [numar,setNumar]=useState(0);
    const onChangeNumar= (e)=>{
        setNumar(e.target.value);
    }
    const addLocuri = ()=>{
        var axios = require('axios');
        var data = JSON.stringify({
            "numar": numar
        });

        var config = {
            method: 'post',
            url: 'http://licenta.com/profesor/add/'+JSON.parse(sessionStorage.getItem("loggeduser")).id,
            headers: {
                'Content-Type': 'application/json',
            },
            data : data
        };
        axios(config)
            .then(function (response) {
                props.confirm("Locuri adaugate cu succes");
                props.refreshData();
                props.handleClose();
            })
            .catch(function (error) {
                if(error.response)
                    if(error.response.data.errors){
                        props.alert(error.response.data.errors[0]);
                    }
                else props.alert("Serviciul de profesori nu este disponibil");
            });

    }
    return(
        <Box>
            <Dialog
                open={props.open}
                TransitionComponent={Transition}
                keepMounted
                onClose={props.handleClose}
            >
                <DialogTitle id="alert-dialog-slide-title">{"Cate locuri doriti sa adaugati?"}</DialogTitle>
                <DialogContent>
                    <TextField
                        value={numar}
                        onChange={onChangeNumar}
                        id="outlined-basic"
                        label="Outlined"
                        variant="outlined" />
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button disabled={numar===0 || numar===''} onClick={addLocuri} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}