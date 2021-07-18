import React from 'react';
import '../Stylesheet/student-dashboard.css'
import {Button} from "@material-ui/core";
import {useHistory} from "react-router";

export const SideBarContent =  (props) =>{
    const history=useHistory();

    const goToColaborare = () =>{
        history.push('/student/colaborare');
    }
    const goToTeme = () =>{
        history.push('/student/teme');
    }
    const goHome = () =>{
        history.push('/student');
    }
    const logout= () =>{
        var axios = require('axios');

        var config = {
            method: 'post',
            url: 'http://licenta.com/users/signout',
            headers: { }
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                sessionStorage.clear();
                history.push('/');
            })
            .catch(function (error) {
                console.log(error);
            });

    }
    return (
        <div className="sideBarContent">
            <div>
                <Button onClick={goHome}>
                    Home
                </Button>
            </div>
            <div>
            <Button onClick={logout}>
                Logout
            </Button>
            </div>
            <div>
            <Button onClick={goToColaborare}>
                Colaborare
            </Button>
            </div>
            <div>
                <Button onClick={goToTeme}>
                    Teme propuse de profesori
                </Button>
            </div>
        </div>
    );
}