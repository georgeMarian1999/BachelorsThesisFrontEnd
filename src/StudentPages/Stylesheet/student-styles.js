import {createMuiTheme, ThemeProvider, withStyles} from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import React from "react";
import Slide from '@material-ui/core/Slide';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";


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
        color: 'white',
        width:'100%',
        margin: 10,
        padding: 10,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backdropFilter: 'blur(2rem)',
    },
    homeTitlePaper:{
      padding:15,
    },
    homeSubtitlePaper:{
      padding:5,
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    searchTeacherField:{
      marginTop: 10,
    },
    dashboardBody:{
        minHeight: '100vh',
        fontSize: 20,
        backgroundImage: 'linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardContent:{
        padding: 15,
        width: '100%',
        margin:20,
    },
    trimiteCerereButton:{
        backgroundImage: 'linear-gradient(to top, #37ecba 0%, #72afd3 80%)'
    },
    trimiteCerereButtonDisabled:{
        backgroundImage: 'linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)',
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
        flexDirection: 'column',
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