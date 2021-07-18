import {createMuiTheme, ThemeProvider, withStyles} from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import React from "react";
import Slide from '@material-ui/core/Slide';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MuiAlert from "@material-ui/lab/Alert";
export function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
export const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
})((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));
export const StyledMenuItem = withStyles((theme) => ({
    root: {
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white,
            },
        },
    },
}))(MenuItem);
export const useStyles = makeStyles((theme)=>({
    card: {
        background: 'linear-gradient(\n' +
            '            to right bottom,\n' +
            '            rgba(255, 255, 255, 0.6),\n' +
            '            rgba(255, 255, 255, 0.2)\n' +
            '    )',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'black',
        margin: 10,
        padding: 10,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backdropFilter: 'blur(2rem)',
    },
    acceptaButton:{
        backgroundImage: 'linear-gradient(to right, #43e97b 0%, #38f9d7 100%)',
    },
    refuzaButton:{
        backgroundImage: 'linear-gradient(to top, #ff0844 0%, #ffb199 100%)',
    },
    accrefButtonWrapper:{
        display: 'flex',
        justifyContent:'space-between',
        alignItems: 'center',
        width: '100vh',
    },
    colaborariFilter:{
      right: 0,
        top:10,
        marginTop:110,
      marginRight:100,
        position:'absolute',
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    dashboardBody:{
        minHeight: '100vh',
        fontSize: 20,
        backgroundColor: '#CDDCDC',
        backgroundImage: 'radial-gradient(at 50% 100%, rgba(255,255,255,0.50) 0%, rgba(0,0,0,0.50) 100%), linear-gradient(to bottom, rgba(255,255,255,0.25) 0%, rgba(0,0,0,0.25) 100%)',
        backgroundBlendMode:'screen,overlay',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    renuntaButton:{
        backgroundImage:' linear-gradient(to top, #f77062 0%, #fe5196 100%)',
    },
    adaugaButton:{
        backgroundImage: 'linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)',
    },
    cardContent:{
        padding: 15,
        width: '80%',
        margin:20,
    },
    trimiteCerereButton:{
        backgroundImage: 'linear-gradient(to top, #37ecba 0%, #72afd3 80%)'
    },
    veziDomeniiButton:{
        backgroundImage: 'linear-gradient(to top, #accbee 0%, #e7f0fd 100%)',
    },
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    content:{
        marginTop:100,
        width: '100%',
        display:  'flex',
        margin: 20,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: "center",
    },
    flexContent:{
        marginTop:100,
        width: '100%',
        display:  'flex',
        justifyContent: 'space-evenly',
        alignItems: "center",
    },
    avatar: {
        backgroundImage: 'linear-gradient(to top, #37ecba 0%, #72afd3 100%)',
    },
    listaTemeitem:{
        margin: 20,
        width: '80%',
        background: 'linear-gradient(\n' +
            '                to right bottom,\n' +
            '                rgba(255, 255, 255, 0.6),\n' +
            '                rgba(255, 255, 255, 0.2))',
        borderRadius: '2rem',
        display:  'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    profileContent:{
        //marginTop: 100,
        width: '100%',
        display:  'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: "center",
    },
    profileBody:{
        minHeight: '100vh',
        fontSize: 20,

        backgroundImage: 'linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileItem:{
        margin: 20,
        width: '70%',
        background: 'linear-gradient(\n' +
            '                to right bottom,\n' +
            '                rgba(255, 255, 255, 0.6),\n' +
            '                rgba(255, 255, 255, 0.2))',
        borderRadius: '2rem',
        display:  'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    table :{
        '& > *': {
            borderBottom: 'unset',
        },
    },
    navBarContent: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    }

}));