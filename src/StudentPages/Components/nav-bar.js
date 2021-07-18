import React, {useState} from "react";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import HomeIcon from "@material-ui/icons/Home";
import ListItemText from "@material-ui/core/ListItemText";
import AssignmentIcon from "@material-ui/icons/Assignment";
import PeopleIcon from "@material-ui/icons/People";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import AccountCircle from "@material-ui/icons/AccountCircle";
import AppBar from "@material-ui/core/AppBar";
import {useHistory} from "react-router";
import MenuItem from '@material-ui/core/MenuItem';
import {StyledMenu,StyledMenuItem} from "../Stylesheet/student-styles";
import '../Stylesheet/student-dashboard.css';
import Badge from '@material-ui/core/Badge';

import {useStyles} from "../Stylesheet/student-styles";

export const NavBar = (props) =>{
    const classes=useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const history=useHistory();
    const [openAcc,setOpenAcc]=useState(false);
    const openAccMenu = () =>{
        setOpenAcc(true);
    }
    const closeAccMenu = () =>{
        setOpenAcc(false);
    }
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const goToListaProfesori = ()=>{
        history.push('/student/listaprofesori')
    }
    const goToProfile = () =>{
        history.push('/student/profile');
    }
    const goToColaborare = () =>{
        history.push('/student/colaborare');
    }
    const goToTeme = () =>{
        history.push('/student/teme');
    }
    const goToColaborareRevizuire= ()=>{
        history.push('/student/revizuire');
    }
    const goToColaborariRefuzate = ()=>{
        history.push('/student/refuzate');
    }
    const goHome = () =>{
        handleClose();
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
                sessionStorage.clear();
                history.push('/');

            });
    }
    const renderMenu = (
        <StyledMenu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id='profile-menu'
            keepMounted
            open={openAcc}
            onClose={closeAccMenu}
        >
            <MenuItem onClick={goToProfile}>My account</MenuItem>
            <MenuItem onClick={logout}>Logout</MenuItem>
        </StyledMenu>
    );
    return(
        <AppBar className="navBar">
            <Toolbar className={classes.navBarContent}>
                <IconButton onClick={handleMenu} edge="start"  color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton>
                <StyledMenu
                    id="customized-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <StyledMenuItem onClick={goHome}>
                        <ListItemIcon>
                            <HomeIcon fontSize="small"/>
                        </ListItemIcon>
                        <ListItemText primary="Home"/>
                    </StyledMenuItem >
                    <StyledMenuItem onClick={goToColaborare}>
                            <ListItemIcon>
                                <AssignmentIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText primary="Colaborarea acceptata" />
                    </StyledMenuItem>
                    <StyledMenuItem onClick={goToColaborareRevizuire}>
                        <ListItemIcon>
                            <AssignmentIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Colaborarea in revizuire" />
                    </StyledMenuItem>
                    <StyledMenuItem onClick={goToColaborariRefuzate}>
                        <ListItemIcon>
                            <AssignmentIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Colaborari refuzate" />
                    </StyledMenuItem>
                    <StyledMenuItem onClick={goToListaProfesori}>
                        <ListItemIcon>
                            <PeopleIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Lista profesorilor" />
                    </StyledMenuItem>
                    <StyledMenuItem onClick={goToTeme}>
                        <ListItemIcon>
                            <MenuBookIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Lista temelor propuse de profesori" />
                    </StyledMenuItem>
                </StyledMenu>
                {renderMenu}
                <div>
                    <IconButton
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={openAccMenu}
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>

                </div>
            </Toolbar>
        </AppBar>
    );
}