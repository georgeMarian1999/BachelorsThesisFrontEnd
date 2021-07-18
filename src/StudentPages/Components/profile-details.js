import React, {useEffect, useState} from "react";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import EmailIcon from '@material-ui/icons/Email';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import {CircularProgress} from "@material-ui/core";

export const ProfileDetails = (props) =>{
    const [status,setStatus]=useState('');
    const [loading,setLoading]=useState(false);
    const getStatus = () =>{
        setLoading(true);
        var axios = require('axios');

        var config = {
            method: 'get',
            url: 'http://licenta.com/colaborare/check/'+JSON.parse(sessionStorage.getItem("loggeduser")).student_id,
            headers: {
            }
        };
        axios(config)
            .then(function (response) {
                setLoading(false);
                setStatus(response.data);
            })
            .catch(function (error) {
                setLoading(false);
                if(error.response){
                if(error.response.data.errors)
                    setStatus(error.response.data.errors[0].message);
                }
                else setStatus("Serviciul de colaborari este indisponibil momentan");
            });
    }
    useEffect(()=>{
        getStatus();
    },[])
    return(
        <div>
            <List>
                <ListItem>
                    <ListItemIcon>
                        <EmailIcon />
                        Email: {props.student.email}
                    </ListItemIcon>

                </ListItem>
                <ListItem>
                    <ListItemIcon>
                        <FormatListNumberedIcon />
                        An studiu: {props.student.anStudiu}
                    </ListItemIcon>
                </ListItem>
                <ListItem>
                    <ListItemIcon>
                        <PeopleAltIcon />
                        Grupa: {props.student.grupa}
                    </ListItemIcon>
                </ListItem>
                <ListItem>
                    {!loading && <ListItemIcon>

                        <AssignmentIndIcon />
                        Statusul studentului: {status}
                    </ListItemIcon>
                    }
                    {loading && <CircularProgress/>}
                </ListItem>

            </List>
        </div>
    )

}