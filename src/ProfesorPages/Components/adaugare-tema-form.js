import React, {useEffect, useState} from "react";
import Button from '@material-ui/core/Button';
import {useStyles} from "../Stylesheet/prof-styles";
import Dialog from '@material-ui/core/Dialog';
import ListItem from '@material-ui/core/ListItem';
import {TextField} from "@material-ui/core";
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import FormControl from '@material-ui/core/FormControl';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import CloseIcon from '@material-ui/icons/Close';
import {Transition} from "../Stylesheet/prof-styles";
export const AdaugareTemaForm = (props)=>{
    const [descriere,setDescriere]=useState('');
    const [titlu,setTitlu]=useState('');
    const [domeniu,setDomeniu]=useState(0);

    const [domenii,setDomenii]=useState([]);

    const onChangeTitlu= (e)=>{
        setTitlu(e.target.value);
    }
    const onChangeDescriere = (e)=>{
        setDescriere(e.target.value);
    }
    const handleClose = ()=>{
        setTitlu('');
        setDescriere('');
        setDomeniu(0);
        props.closeForm();
    }
    const addTema = ()=>{
        var axios = require('axios');
        var data = JSON.stringify({
            "tema_titlu": titlu,
            "tema_descriere": descriere,
            "tema_status": "LIBERA",
            "domeniu_id": domeniu,
            "profesor_id": JSON.parse(sessionStorage.getItem("loggeduser")).id
        });

        var config = {
            method: 'post',
            url: 'https://licenta-microservices.herokuapp.com/monolit/tema/add',
            headers: {
                'Content-Type': 'application/json'
            },
            data : data
        };

        axios(config)
            .then(function (response) {
                props.confirm("Tema adaugata cu succes");
                handleClose();
                props.refreshData();
            })
            .catch(function (error) {
                handleClose();
                if(error.response){
                    if(error.response.data){
                        props.alertError(error.response.data)
                    }
                }
                else props.alertError("Serviciul de teme este indisponibil");
                console.log(error);
            });
    }
    const onChangeDomeniu = (e)=>{
        setDomeniu(e.target.value);
    }
    const getDomenii = ()=>{
        var axios = require('axios');

        var config = {
            method: 'get',
            url: 'https://licenta-microservices.herokuapp.com/monolit/interes/'+JSON.parse(sessionStorage.getItem("loggeduser")).id,
            headers: { }
        };

        axios(config)
            .then(function (response) {
                setDomenii(response.data);
            })
            .catch(function (error) {
                handleClose();
                if(error.response){
                if(error.response.data){
                    props.alertError(error.response.data+ " deci nu puteti adauga teme");
                }}
                else props.alertError("Serviciul de domenii este indisponibil");
            });
    }
    useEffect(()=>{
        getDomenii();
    },[])
    const classes=useStyles();
    return(
        <Dialog fullScreen open={props.open} onClose={handleClose} TransitionComponent={Transition}>
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Formular de cerere adaugare tema noua
                    </Typography>
                    <Button
                        autoFocus
                        color="inherit"
                        disabled={descriere===''||titlu===''||domeniu===0}
                        onClick={addTema}>
                        Save
                    </Button>
                </Toolbar>
            </AppBar>
            <List>
                <ListItem >
                    <TextField
                        id="titlul-temei"
                        label="Titlul temei"
                        value={titlu}
                        onChange={onChangeTitlu}
                        helperText="Introduceti un titlu pentru tema noua"
                        variant="outlined"
                        fullWidth
                    />
                </ListItem>
                <ListItem >
                    <TextField
                        id="descrierea-temei"
                        label="Descrierea temei"
                        value={descriere}
                        onChange={onChangeDescriere}
                        helperText="Introduceti o descriere a temei"
                        variant="outlined"
                        fullWidth
                    />
                </ListItem>
                <Divider />
                <ListItem>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="select-domeniu">Domeniu</InputLabel>
                        <Select
                            disabled={domenii.length===0}
                            labelId="select-domeniu"
                            id="select-domeniu"
                            value={domeniu}
                            onChange={onChangeDomeniu}
                            label="Domeniu"
                            fullWidth
                        >
                            {domenii.map((domeniu)=>(
                                <MenuItem value={domeniu.domeniu_id}>{domeniu.domeniu_titlu}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </ListItem>
            </List>
        </Dialog>
    )
}