import React, {useEffect, useState} from "react";
import {useStyles} from "../Stylesheet/student-styles";
import Box from '@material-ui/core/Box';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import {CardHeader, CircularProgress, Divider, ListItemText} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import {DomeniiDialog} from "./domenii-dialog";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import {TrimiteCerereForm} from "./trimite-cerere-form";

export const Profesor = (props)=>{
    const [dialogOpen,setDialogOpen]=useState(false);
    const classes=useStyles();
    const [loading,setLoading]=useState(false);
    const [openForm,setOpenForm]=useState(false);
    const [locuriDisponibile,setLocuri]=useState(false);
    const [stateStudent,setStateStudent]=useState("");
    const handleOpenForm = () =>{
        setOpenForm(true);
    }
    const handleCloseForm = () =>{
        setOpenForm(false);
    }
    const veziDomenii = ()=>{
        setDialogOpen(true);
    }
    const handleCloseDialog= ()=>{
        setDialogOpen(false);
    }
    const newError =(msg)=>{
        setDialogOpen(false);
        props.alert(msg);
    }
    const refreshStatusStudent =()=>{
        props.refresh();
    }
    useEffect(()=>{
        checkStudent();
    },[])
    const checkStudent = ()=>{
        setLoading(true);
        setStateStudent("");
        var axios = require('axios');

        var config = {
            method: 'get',
            url: 'http://licenta.com/colaborare/check/'+JSON.parse(sessionStorage.getItem("loggeduser")).student_id,
            headers: {
            }
        };

        axios(config)
            .then(function (response) {
                setStateStudent("LIBER");
                setLoading(false);
            })
            .catch(function (error) {
                setLoading(false);
                if(error.response.data.errors){
                        if(error.response.data.errors[0].message==="Colaborare activa si in revizuire"){
                            setStateStudent("REVIZUIRE");
                        }
                        else setStateStudent("ACCEPTATA");
                    }
                else props.alert("Serviciul de colaborari este indisponibil");
            });
    }
    return(
        <Box>
        <Card className={classes.cardContent}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" className={classes.avatar}>
                            {props.profesor.firstname.charAt(0)}
                        </Avatar>
                    }
                    title={props.profesor.firstname+" "+props.profesor.lastname}
                    subheader={"Titlu: "+props.profesor.titlu}
                />
                <CardContent>
                    <h4>Locuri disponibile: {props.profesor.numar_locuri}</h4>
                </CardContent>
                <CardActions>

                    {stateStudent==="" &&<Button  className={classes.trimiteCerereButtonDisabled}>Loading...</Button>}
                    {!loading &&stateStudent==="REVIZUIRE"&& <Button  className={classes.trimiteCerereButtonDisabled}>Aveti deja o colaborare in revizuire</Button>}
                    {!loading &&stateStudent==="ACCEPTATA"&& <Button  className={classes.trimiteCerereButtonDisabled}>Aveti deja o colaborare acceptata</Button>}
                    {!loading &&stateStudent==="LIBER"&& <Button disabled={props.profesor.numar_locuri===0} onClick={handleOpenForm} className={classes.trimiteCerereButton}>Trimite cerere</Button>}
                    <Button onClick={veziDomenii} className={classes.veziDomeniiButton}>Vezi domenii de interes</Button>
                </CardActions>
        </Card>
            <DomeniiDialog newError={newError} profesor={props.profesor} profesor_id={props.profesor.id} handleCloseDialog={handleCloseDialog} open={dialogOpen}/>
            <TrimiteCerereForm refresh={refreshStatusStudent} confirm={props.confirm} alertError={newError} open={openForm} closeForm={handleCloseForm} profesor={props.profesor} />
        </Box>
    )
}