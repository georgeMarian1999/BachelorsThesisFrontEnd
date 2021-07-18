import React, {useEffect, useState} from "react";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import HomeIcon from "@material-ui/icons/Home";
import ListItemText from "@material-ui/core/ListItemText";
import AssignmentIcon from "@material-ui/icons/Assignment";
import PeopleIcon from "@material-ui/icons/People";
import Badge from '@material-ui/core/Badge';
import MenuBookIcon from "@material-ui/icons/MenuBook";
import AccountCircle from "@material-ui/icons/AccountCircle";
import AppBar from "@material-ui/core/AppBar";
import {useHistory} from "react-router";
import MenuItem from '@material-ui/core/MenuItem';
import {StyledMenu,StyledMenuItem} from "../Stylesheet/prof-styles";
import {useStyles} from "../Stylesheet/prof-styles";
export const NavBar = (props) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const [numar,setNumar]=useState(0);
    const history = useHistory();
    const [openAcc, setOpenAcc] = useState(false);
    var timer;
    const openAccMenu = () => {
        setOpenAcc(true);
    }
    const closeAccMenu = () => {
        setOpenAcc(false);
    }
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    useEffect(()=>{
        getCereriNoi();
    },[])
    const getCereriNoi = ()=>{
        var axios = require('axios');

        var config = {
            method: 'get',
            url: 'http://licenta.com/colaborare/revizuire/profesor/numar/'+JSON.parse(sessionStorage.getItem("loggeduser")).id,
        };

        axios(config)
            .then(function (response) {
                setNumar(response.data.numar);
                timer=setTimeout(getCereriNoi,4000);
            })
            .catch(function (error) {
                setNumar(0);
                clearTimeout(timer);
            });

    }
    const handleClose = () => {
        setAnchorEl(null);
    };
    const goToListaDomeniiPersonale = () => {
        history.push('/profesor/domeniipersonale')
    }
    const goToColaborariRevizuire = ()=>{
        history.push('/profesor/colaborari/revizuire');
    }
    const goToColaborariRefuzate = ()=>{
        history.push('/profesor/colaborari/refuzate');
    }
    const goToColaborari = () => {
        history.push('/profesor/colaborari');
    }
    const goToTemePersonale = () => {
        history.push('/profesor/teme');
    }
    const goHome = () => {
        handleClose();
        history.push('/profesor');
    }
    const logout = () => {
        var axios = require('axios');

        var config = {
            method: 'post',
            url: 'http://licenta.com/profesor/signout',
            headers: {}
        };
        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                sessionStorage.clear();
                history.push('/loginprof');
            })
            .catch(function (error) {
                sessionStorage.clear();
                history.push('/loginprof');
            });
    }
    const renderMenu = (
        <StyledMenu
            anchorEl={anchorEl}
            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            id='profile-menu'
            keepMounted
            open={openAcc}
            onClose={closeAccMenu}
        >
            <MenuItem onClick={logout}>Logout</MenuItem>
        </StyledMenu>
    );
    return (
        <AppBar>
            <Toolbar className={classes.navBarContent}>
                <IconButton onClick={handleMenu} edge="start" color="inherit" aria-label="menu">
                    <MenuIcon/>
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
                    </StyledMenuItem>
                    <StyledMenuItem onClick={goToColaborari}>
                        <ListItemIcon>
                            <AssignmentIcon fontSize="small"/>
                        </ListItemIcon>
                        <ListItemText primary="Colaborarile acceptate"/>
                    </StyledMenuItem>
                    <StyledMenuItem onClick={goToColaborariRevizuire}>
                        <ListItemIcon>
                            <Badge badgeContent={numar} color="secondary">

                                <AssignmentIcon fontSize="small"/>
                            </Badge>
                        </ListItemIcon>
                        <ListItemText primary="Cereri noi"/>
                    </StyledMenuItem>
                    <StyledMenuItem onClick={goToColaborariRefuzate}>
                        <ListItemIcon>
                            <AssignmentIcon fontSize="small"/>
                        </ListItemIcon>
                        <ListItemText primary="Colaborarile refuzate"/>
                    </StyledMenuItem>
                    <StyledMenuItem onClick={goToListaDomeniiPersonale}>
                        <ListItemIcon>
                            <PeopleIcon fontSize="small"/>
                        </ListItemIcon>
                        <ListItemText primary="Lista domeniilor dumneavoastra"/>
                    </StyledMenuItem>
                    <StyledMenuItem onClick={goToTemePersonale}>
                        <ListItemIcon>
                            <MenuBookIcon fontSize="small"/>
                        </ListItemIcon>
                        <ListItemText primary="Lista temelor propuse de dumneavoastra"/>
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
                        <AccountCircle/>
                    </IconButton>

                </div>
            </Toolbar>

        </AppBar>
    );
}