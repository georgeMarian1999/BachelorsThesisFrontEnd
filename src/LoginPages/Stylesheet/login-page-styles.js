import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles((theme)=>({
    loginBody:{
        minHeight: '100vh',
        fontSize: 20,
        backgroundImage: 'linear-gradient(to top, #d9afd9 0%, #97d9e1 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    profLoginBody:{
        minHeight: '100vh',
        fontSize: 20,
        backgroundColor: '#CDDCDC',
        backgroundImage: 'radial-gradient(at 50% 100%, rgba(255,255,255,0.50) 0%, rgba(0,0,0,0.50) 100%), linear-gradient(to bottom, rgba(255,255,255,0.25) 0%, rgba(0,0,0,0.25) 100%)',
        backgroundBlendMode:'screen,overlay',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    formWrapper:{
        width: '40%',
        background: 'antiquewhite',
        height: 'auto',
        borderRadius: 5,
        left:0,
        right:0,
        position: 'absolute',
        marginRight:'auto',
        marginLeft: 'auto',
        boxShadow: '-4px 4px 20px 2px rgba(0, 0, 0, 0.4), 4px 4px 20px 2px rgba(0, 0, 0, 0.4)',
    },
    buttonWrapper:{
        width: '90%',
        padding: 15,
        marginLeft: 'auto',
        marginRight: 'auto',
        textAlign:'center',
        marginBottom: 10,
    },
    button:{
        marginTop:15,
    },
    profLoginButton:{
        marginTop:15,
        padding:10,
        backgroundImage: 'linear-gradient(15deg, #13547a 0%, #80d0c7 100%)',
    }
}));