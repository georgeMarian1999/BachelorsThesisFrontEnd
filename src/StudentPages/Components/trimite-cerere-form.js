import React, {useEffect, useState} from "react";
import {useStyles} from "../Stylesheet/student-styles";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Radio from '@material-ui/core/Radio';
import ListItem from '@material-ui/core/ListItem';
import {TextField} from "@material-ui/core";
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import CloseIcon from '@material-ui/icons/Close';
import {Transition} from "../Stylesheet/student-styles";
export const TrimiteCerereForm = (props)=>{
    const [descriere,setDescriere]=useState('');
    const [tema_proprie,setTema_proprie]=useState('');
    const [selectedValue, setSelectedValue] = React.useState('proprie');
    const [domeniu,setDomeniu]=useState(0);

    const [tema_propusa,setTema_propusa]=useState(0);
    const [teme,setTeme]=useState([]);
    const [domenii,setDomenii]=useState([]);
    const handleChange = (event) => {
        setSelectedValue(event.target.value);
        setDomeniu(0);
        setTema_propusa(0);
        setTema_proprie('');
    };
    const onChangeTema_Propusa = (e)=>{
        setTema_propusa(e.target.value);
    }
    const onChangeDescriere = (e)=>{
        setDescriere(e.target.value);
    }
    const onChangeTema_Proprie = (e)=>{
        setTema_proprie(e.target.value);
    }
    const handleClose = ()=>{
        props.closeForm();
    }
    const onChangeDomeniu = (e)=>{
        setDomeniu(e.target.value);
    }
    useEffect(()=>{
        getTeme();
    },[domeniu])
    const getTeme =()=>{
        setTeme([]);
        var axios = require('axios');

        var config = {
            method: 'get',
            url: 'https://licenta-microservices.herokuapp.com/monolit/tema/free',
            headers: { }
        };
        axios(config)
            .then(function (response) {
                setTeme(response.data.filter(function(el){
                    return el.domeniu_id===domeniu;
                }));
            })
            .catch(function (error) {
                handleClose();
                if(error.response){
                    if(error.response.data){
                        props.alertError(error.response.data)
                    }
                }
                else props.alertError("Serviciul de domenii este indisponibil");
            });
    }
    const trimiteCerere =()=>{
        var axios = require('axios');
        var data = JSON.stringify({
            "student_id": JSON.parse(sessionStorage.getItem("loggeduser")).student_id,
            "profesor_id": props.profesor.id,
            "tema_id": tema_propusa,
            "tema_proprie": tema_proprie,
            "descriere": descriere
        });

        var config = {
            method: 'post',
            url: 'http://licenta.com/colaborare/add',
            headers: {
                'Content-Type': 'application/json',
            },
            data : data
        };

        axios(config)
            .then(function (response) {
                props.confirm("Cerere trimisa cu success!");
                props.refresh();
                handleClose();
            })
            .catch(function (error) {
                handleClose();
                if(error.response){
                    if(error.response.data){
                        props.alertError(error.response.data.errors[0].message);
                    }
                }
                else props.alertError("Serviciul de colaborari este indisponibil");
            });

    }
    const getDomenii = ()=>{
        var axios = require('axios');

        var config = {
            method: 'get',
            url: 'https://licenta-microservices.herokuapp.com/monolit/interes/'+ props.profesor.id,
            headers: { }
        };

        axios(config)
            .then(function (response) {
                setDomenii(response.data);
            })
            .catch(function (error) {
                //handleClose();
                if(error.response){
                    if(error.response.data){
                        props.alertError(error.response.data)
                    }
                }
                else props.alertError("Serviciul de domenii este indisponibil");
            });
    }
    useEffect(()=>{
        if(selectedValue==='propusa'){
            getDomenii();
        }
        else setDomenii([]);
    },[selectedValue])
    const classes=useStyles();
    const disabledSendButton=(selectedValue==='proprie'&&(descriere===''||tema_proprie===''))||(selectedValue==='propusa'&&(descriere===''||domeniu===0||tema_propusa===0));
    return(
        <Dialog fullScreen open={props.open} onClose={handleClose} TransitionComponent={Transition}>
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Formular de cerere de colaborare cu profesorul {props.profesor.firstname} {props.profesor.lastname}
                    </Typography>
                    <Button
                        disabled={disabledSendButton}
                        autoFocus color="inherit" onClick={trimiteCerere}>
                        Trimite
                    </Button>
                </Toolbar>
            </AppBar>
            <List>
                <ListItem >
                    <TextField
                        id="descriere-Text"
                        label="Descrierea colaborarii"
                        value={descriere}
                        onChange={onChangeDescriere}
                        helperText="Introduceti o descriere a colaborarii. Va poate ajuta sa convingeti profesorul sa accepte cererea"
                        variant="outlined"
                        fullWidth
                    />
                </ListItem>
                <Divider />
                <ListItem >
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Tipul temei pentru colaborare</FormLabel>
                        <RadioGroup row aria-label="position" name="position" value={selectedValue} onChange={handleChange}>
                            <FormControlLabel
                                value="propusa"
                                control={<Radio color="primary" />}
                                label="Tema propusa de profesori"
                                labelPlacement="bottom"
                            />
                            <FormControlLabel
                                value="proprie"
                                control={<Radio color="primary" />}
                                label="Tema proprie"
                                labelPlacement="bottom"
                            />
                        </RadioGroup>
                    </FormControl>
                </ListItem>
                <Divider />
                <ListItem >
                    <TextField
                        id="titlu-tema-proprie"
                        label="Titlul temei proprii"
                        disabled={selectedValue==='propusa'}
                        value={tema_proprie}
                        onChange={onChangeTema_Proprie}
                        helperText="Introduceti titlul temei pe care doriti sa o propuneti"
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
                        >
                            {domenii.map((domeniu)=>(
                                <MenuItem value={domeniu.domeniu_id}>{domeniu.domeniu_titlu}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </ListItem>
                <ListItem>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="select-tema">Alegeti tema</InputLabel>
                        <Select
                            disabled={domenii.length===0}
                            labelId="select-domeniu"
                            id="select-domeniu"
                            value={tema_propusa}
                            onChange={onChangeTema_Propusa}
                            label="Tema"
                            fullWidth
                        >
                            {teme.map((tema)=>(
                                <MenuItem value={tema.tema_id}>{tema.tema_titlu}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </ListItem>
            </List>
        </Dialog>
    )
}