import React, {useEffect, useState} from "react";
import {useStyles} from "../Stylesheet/student-styles";
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import {CardHeader, CircularProgress, Divider, ListItemText} from "@material-ui/core";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Box from '@material-ui/core/Box';
import {Card} from "@material-ui/core";
import Backdrop from '@material-ui/core/Backdrop';

export const ColaborareRev = (props)=>{
    const [profesor,setProfesor]=useState({
        email: "",
        firstname: "",
        lastname: "",
        numar_locuri: "",
        titlu: "",
        facultate_id: "",
        id: ""
    });
    const [loadingProf,setLoadingProf]=useState(false);
    const [errorProfesor,setErrorProfesor]=useState(false);

    const [colaborare,setColaborare]=useState({
        _id: "",
        student_id: "",
        profesor_id: "",
        tema_id: 0,
        tema_proprie: "",
        descriere: "",
        status: "",
        __v: 0
    });
    const [tema,setTema]=useState({
        tema_id: 0,
        tema_titlu: "",
        tema_descriere: "",
        tema_status: "",
        domeniu_id: 0,
        profesor_id: ""
    })
    const [eroare,setEroare]=useState("");
    const [errorStatus,setErrorStatus]=useState(false);
    const [loading,setLoading]=useState(false);
    const classes=useStyles();


    useEffect(()=>{
        getCrtUserCol();
    },[])
    const getProf = (id) =>{
        setLoadingProf(true);
        var axios = require('axios');

        var config = {
            method: 'get',
            url: 'http://licenta.com/profesor/'+id,
            headers: { }
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                setLoadingProf(false);
                setLoading(false);
                setProfesor(response.data);
            })
            .catch(function (error) {
                setLoading(false);
                setLoadingProf(false);
                alertError("Eroare la serviciul de profesori");
                console.log(error);
                setErrorProfesor(true);
            });


    }
    const alertError = (msg)=>{
        props.alert(msg);
    }
    const getCrtUserCol= (props) =>{
        setLoading(true);
        var axios = require('axios');

        var config = {
            method: 'get',
            url: 'http://licenta.com/colaborare/revizuire/'+JSON.parse(sessionStorage.getItem("loggeduser")).student_id,
            headers: {}
        };
        axios(config)
            .then(function (response) {
                console.log(response.data);
                if(response.data.colaborare){
                    setColaborare(response.data.colaborare);
                    setEroare(response.data.eroare);
                    if(response.data.tema){
                        setTema(response.data.tema);
                    }
                    else {
                        alertError(response.data.eroare);
                        setErrorStatus(true);
                    }
                    getProf(response.data.colaborare.profesor_id);
                }
                else {
                    setColaborare(response.data);
                    setTema({
                        tema_id: 0,
                        tema_titlu: response.data.tema_proprie,
                        tema_descriere: "Nu este descriere la tema",
                        tema_status: "",
                        domeniu_id: 0,
                        profesor_id: ""
                    })
                    getProf(response.data.profesor_id);
                }

            })
            .catch(function (error) {
                setLoading(false);
                alertError("Serviciul de colaborari este indisponibil");
                console.log(error);
            });
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
                        subheader={"Status :" +colaborare.status}
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
                                Descrierea colaborarii: {colaborare.descriere}
                            </ListItem>
                        </List>
                    </CardContent>
                </Card>
            }
            {loading &&
            <Backdrop className={classes.backdrop} open={loading} >
                <CircularProgress color="inherit" />
            </Backdrop>}
        </Box>

    )
}