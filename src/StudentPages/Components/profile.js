import React, {useEffect, useState} from "react";

import Box from '@material-ui/core/Box';
import {NavBar} from "./nav-bar";
import {useStyles} from "../Stylesheet/student-styles";
import {CircularProgress} from "@material-ui/core";
import {ProfileDetails} from "./profile-details";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}export const Profile = (props) =>{
    const classes=useStyles();
    const [open,setOpen]=useState(false);
    const [errorMsg,setErrorMsg]=useState('');
    const handleCloseAlert = ()=>{
        setOpen(false);
    }
    const handleOpenAlert = (msg)=>{
        setErrorMsg(msg);
        setOpen(true);
    }
    const [loadingUser,setLoadingUser]=useState(false);
    const [student,setStudent]=useState({
        anStudiu: 0,
        email: "",
        firstname: "",
        grupa: 332,
        lastname: "",
        sectie: "",
        student_id: "",
    })
    useEffect(()=>{
        setLoadingUser(true);
        setStudent(JSON.parse(sessionStorage.getItem("loggeduser")));
        setLoadingUser(false);
    },[])
    return(
        <Box className={classes.profileBody}>
            <NavBar/>
            <Box className={classes.profileContent}>
                <Box className={classes.profileItem}>
                    {!loadingUser &&
                    <Box>
                        <h2>Hello {student.firstname} {student.lastname}</h2>
                        <h4>Sectia: {student.sectie}</h4>
                    </Box>
                    }
                    {loadingUser&& <CircularProgress/>}
                </Box>
                <Box className={classes.profileItem}>
                    <ProfileDetails student={student}/>
                </Box>
            </Box>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity="error">
                    {errorMsg}
                </Alert>
            </Snackbar>
        </Box>
    );
}