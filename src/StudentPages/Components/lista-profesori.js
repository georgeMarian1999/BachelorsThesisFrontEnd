import React, {useEffect, useState} from 'react';
import {NavBar} from "./nav-bar";
import {useStyles} from "../Stylesheet/student-styles";
import Box from '@material-ui/core/Box';
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import TextField from '@material-ui/core/TextField';
import {CircularProgress, List} from "@material-ui/core";
import {Profesor} from "./profesor";
import Backdrop from "@material-ui/core/Backdrop";
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export const ListaProfesori = (props)=>{
    const classes=useStyles();
    const [open,setOpen]=useState(false);
    const [errorMsg,setErrorMsg]=useState('');
    const [loading,setLoading]=useState(false);
    const [searchName,setSearchName]=useState('');
    const [stateStudent,setStateStudent]=useState("");
    const [openConfirmation,setOpenConfirmation]=useState(false);
    const [confirmation,setConfirmation]=useState('');
    const [profesorfiltered,setProfesoriFiltered]=useState([]);
    const [profesori,setProfesori]=useState([]);
    const handleCloseAlert = ()=>{
        setOpen(false);
    }
    const handleCloseConfirmation = ()=>{
        setOpenConfirmation(false);
    }
    const handleOpenConfirmation = (msg)=>{
        setOpenConfirmation(true);
        setConfirmation(msg);
    }
    const onChangeName = (e)=>{
        setSearchName(e.target.value);
    }
    const handleOpenAlert = (msg)=>{
        setErrorMsg(msg);
        setOpen(true);
    }
    const getProfi = ()=>{
        setLoading(true);
        var axios = require('axios');

        var config = {
            method: 'get',
            url: 'http://licenta.com/facultate/profesori/'+JSON.parse(sessionStorage.getItem("loggeduser")).facultate_id,
            headers: {
            }
        };
        axios(config)
            .then(function (response) {
                setProfesori(response.data);
                setProfesoriFiltered(response.data);

                setLoading(false);
            })
            .catch(function (error) {
                setLoading(false);
                console.log(error);
                handleOpenAlert("Serviciul facultatii este indisponibil")
            });
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
            .then(function (response) {setStateStudent("LIBER");
               getProfi();
            })
            .catch(function (error) {

                if(error.response.data.errors){
                    if(error.response.data.errors[0].message==="Colaborare activa si in revizuire"){
                        setStateStudent("REVIZUIRE");
                    }
                    else setStateStudent("ACCEPTATA");
                }
                else handleOpenAlert("Serviciul de colaborari este indisponibil");
                getProfi();
            });
    }

    return(
        <Box className={classes.dashboardBody}>
            <NavBar/>
            {!loading && <Box className={classes.content}>
                <Box className={classes.profileItem}>
                    {/*<TextField className={classes.searchTeacherField}*/}
                    {/*           id="standard-search"*/}
                    {/*           label="Search by name"*/}
                    {/*           onChange={onChangeName}*/}
                    {/*           type="search" />*/}
                    {/*<List>*/}
                        {profesorfiltered.map((profesor)=>(
                            <Profesor refresh={getProfi} confirm={handleOpenConfirmation} alert={handleOpenAlert} profesor={profesor}/>
                        ))}
                    {/*</List>*/}
                </Box>
            </Box>}
            {loading &&
            <Backdrop className={classes.backdrop} open={loading} >
                <CircularProgress color="inherit" />
            </Backdrop>}
            <Snackbar open={open} autoHideDuration={6000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity="error">
                    {errorMsg}
                </Alert>
            </Snackbar>
            <Snackbar open={openConfirmation} autoHideDuration={6000} onClose={handleCloseConfirmation}>
                <Alert onClose={handleCloseConfirmation} severity="success">
                    {confirmation}
                </Alert>
            </Snackbar>

        </Box>
    )
}