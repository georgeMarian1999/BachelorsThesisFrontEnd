import React, {useEffect, useState} from "react";
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import {CardHeader, CircularProgress, Divider, ListItemText} from "@material-ui/core";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Box from '@material-ui/core/Box';
import {Card} from "@material-ui/core";

import Backdrop from '@material-ui/core/Backdrop';
import {useStyles} from "../Stylesheet/prof-styles";
import Button from "@material-ui/core/Button";

export const Colaborare = (props)=> {
    const [student, setStudent] = useState({
        email: "",
        firstname: "",
        lastname: "Error",
        anStudiu: 0,
        grupa: 0,
        sectie: "",
        facultate_id: "",
        student_id: ""
    });
    const [loadingStud, setLoadingStud] = useState(false);
    const [errorStud, setErrorStud] = useState(false);
    const [domeniu, setDomeniu] = useState({
        domeniu_id: 0,
        domeniu_titlu: "",
        domeniu_descriere: "",
        domeniu_specializare: "",
        facultate_id: ""
    });

    const [tema, setTema] = useState({
        tema_id: 0,
        tema_titlu: "",
        tema_descriere: "",
        tema_status: "",
        domeniu_id: 0,
        profesor_id: ""
    })
    const [eroare, setEroare] = useState("");
    const [errorStatus, setErrorStatus] = useState(false);
    const [loading, setLoading] = useState(false);
    const classes=useStyles();
    const getTema = ()=>{
        var axios = require('axios');

        var config = {
            method: 'get',
            url: 'https://licenta-microservices.herokuapp.com/monolit/tema/'+props.colaborare.tema_id,
            headers: { }
        };

        axios(config)
            .then(function (response) {
                setTema(response.data);
            })
            .catch(function (error) {
                if(props.colaborare.tema_id===0){
                    setTema({
                        tema_id: 0,
                        tema_titlu: props.colaborare.tema_proprie,
                        tema_descriere: "Nu este descriere la tema",
                        tema_status: "",
                        domeniu_id: 0,
                        profesor_id: ""
                    })
                }
                else props.alertError("Eroare la serviciul de teme");
            });

    }
    useEffect(() => {
        getStud(props.colaborare.student_id);
        getTema();
    }, []);
    const acceptaColaborare = () =>{
        var axios = require('axios');

        var config = {
            method: 'put',
            url: 'http://licenta.com/colaborare/accepta/'+props.colaborare.colaborare_id,
            headers: { }
        };

        axios(config)
            .then(function (response) {
                props.refreshData();
            })
            .catch(function (error) {
                if(error.response){
                    if(error.response.data){
                        props.alertError(error.response.data.errors[0].message);
                    }
                }
                else props.alertError("Serviciul de colaborari este indisponibil");
            });

    }
    const refuzaColaborare = ()=>{
        var axios = require('axios');

        var config = {
            method: 'put',
            url: 'http://licenta.com/colaborare/refuza/'+props.colaborare.colaborare_id,
            headers: { }
        };

        axios(config)
            .then(function (response) {
                props.refreshData();
            })
            .catch(function (error) {
                if(error.response){
                    if(error.response.data){
                        props.alertError(error.response.data.errors[0].message);
                    }
                }
                else props.alertError("Serviciul de colaborari este indisponibil");
            });

    }
    const getStud = (id) => {
        setLoadingStud(true);
        var axios = require('axios');

        var config = {
            method: 'get',
            url: 'http://licenta.com/users/' + id,
            headers: {}
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                setLoadingStud(false);
                setLoading(false);
                setStudent(response.data);
            })
            .catch(function (error) {
                setLoading(false);
                setLoadingStud(false);
                props.alertError("Eroare la serviciul de studenti");
                console.log(error);
                setErrorStud(true);
            });

    }
    return (
        <Box>
            {
                !loading &&
                <Card className={classes.cardContent}>
                    <CardHeader
                        avatar={
                            <Avatar aria-label="recipe" className={classes.avatar}>
                                C
                            </Avatar>
                        }

                        title={"Colaborare cu " + student.firstname + " " + student.lastname}
                        subheader={"Status :" + props.colaborare.status}
                    />
                    <CardContent className={classes.cardContent}>
                        <List>
                            <ListItem>
                                {!errorStatus && <ListItemText>
                                    Titlul temei: {tema.tema_titlu}
                                </ListItemText>
                                }
                                {errorStatus && <ListItemText>
                                    Titlul temei: Error
                                </ListItemText>}
                            </ListItem>
                            <ListItem>
                                {!errorStatus && <ListItemText>
                                    Descrierea temei: {tema.tema_descriere}
                                </ListItemText>
                                }
                                {errorStatus && <ListItemText>
                                    Descrierea temei: Error
                                </ListItemText>}
                            </ListItem>

                            <ListItem>
                                Descrierea colaborarii: {props.colaborare.descriere}
                            </ListItem>
                            {props.colaborare.status === "REVIZUIRE" &&
                            <ListItem>
                                <Box className={classes.accrefButtonWrapper}>
                                    <Button onClick={refuzaColaborare} className={classes.refuzaButton}>Refuza</Button>
                                    {props.locuri!==0 &&<Button onClick={acceptaColaborare} className={classes.acceptaButton}>Accepta</Button>}
                                    {props.locuri===0 && <Button disabled className={classes.acceptaButton}>Nu mai aveti locuri!</Button>}
                                </Box>
                            </ListItem>
                            }
                        </List>
                    </CardContent>
                </Card>
            }
            {loading &&
            <Backdrop className={classes.backdrop} open={loading}>
                <CircularProgress color="inherit"/>
            </Backdrop>}
        </Box>

    )
}