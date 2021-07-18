import React, {useEffect, useState} from "react";
import {useStyles} from "../Stylesheet/student-styles";
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import {CardHeader, CircularProgress, Divider, ListItemText} from "@material-ui/core";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Box from '@material-ui/core/Box';
import {Card} from "@material-ui/core";

export const ColaborareRefuzata =(props)=>{
    const [profesor,setProfesor]=useState({
        email: "",
        firstname: "",
        lastname: "",
        numar_locuri: "",
        titlu: "",
        facultate_id: "",
        id: ""
    });


    const [tema,setTema]=useState({
        tema_id: 0,
        tema_titlu: "",
        tema_descriere: "",
        tema_status: "",
        domeniu_id: 0,
        profesor_id: ""
    })
    const [errorStatus,setErrorStatus]=useState(false);
    const [loading,setLoading]=useState(false);
    const classes=useStyles();
    const getTema =()=>{
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
                if(error.response){
                    if(error.response.data){
                        props.alertError(error.response.data);
                    }
                }
                else props.alertError("Eroare la serviciul de teme");
            });

    }

    useEffect(()=>{
        getProf(props.colaborare.profesor_id);
        if(props.colaborare.tema_id!==0){
            getTema()
        }
        else {
            setTema({
                tema_id: 0,
                tema_titlu: props.colaborare.tema_proprie,
                tema_descriere: "Nu este descriere la tema",
                tema_status: "",
                domeniu_id: 0,
                profesor_id: ""
            })
        }
    },[])
    const getProf = (id) =>{

        var axios = require('axios');

        var config = {
            method: 'get',
            url: 'http://licenta.com/profesor/'+id,
            headers: { }
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                setLoading(false);
                setProfesor(response.data);
            })
            .catch(function (error) {
                setLoading(false);

                alertError("Eroare la serviciul de profesori");
                console.log(error);

            });


    }
    const alertError = (msg)=>{
        props.alert(msg);
    }

    return(
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

                        title={"Colaborare cu " +profesor.firstname+" "+profesor.lastname}
                        subheader={"Status :" +props.colaborare.status}
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

                            <ListItem >
                                Descrierea colaborarii: {props.colaborare.descriere}
                            </ListItem>
                        </List>
                    </CardContent>
                </Card>
            }

        </Box>

    )
}