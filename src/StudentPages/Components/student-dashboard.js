import React from "react";
import {NavBar} from "./nav-bar";
import {useStyles} from "../Stylesheet/student-styles";
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Divider from "@material-ui/core/Divider";
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import BallotIcon from '@material-ui/icons/Ballot';
import FolderIcon from '@material-ui/icons/Folder';
import ListItem from '@material-ui/core/ListItem';
import GavelIcon from '@material-ui/icons/Gavel';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
export const StudentDashboard = (props)=>{
    const [expanded, setExpanded] =React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    const classes=useStyles();
    return (
        <Box className={classes.dashboardBody}>
            <NavBar/>
            <Box classname={classes.card}>
                <Box className={classes.cardContent}>
                    <Paper className={classes.homeTitlePaper} elevation={3}>
                        <h2>Bine ati venit pe platforma de gestiune a colaborarilor de licenta</h2>
                    </Paper>
                </Box>

                <Divider/>
                <Box className={classes.cardContent}>
                    <Paper className={classes.homeSubtitlePaper} elevation={3}>
                        <h4>Urmatoarea sectiune contine informatii despre cum se foloseste platforma</h4>
                    </Paper>
                </Box>

                <Divider/>
                <Box className={classes.cardContent}>
                    <Paper className={classes.homeSubtitlePaper} elevation={3}>
                        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                            >
                                <BallotIcon/>
                                <Typography className={classes.heading}>Posibilitatile studentului</Typography>

                            </AccordionSummary>
                            <AccordionDetails>
                                <List dense>
                                        <ListItem>
                                            <ListItemIcon>
                                                <FolderIcon />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary="Vizualizarea temelor de licenta propuse de profesori si alegerea unei teme libere pentru o colaborare"
                                            />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon>
                                                <FolderIcon />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary="Vizualizarea profesorilor cu care pot colabora, de asemenea si numarul locurilor disponibile"
                                            />
                                        </ListItem>
                                     <ListItem>
                                        <ListItemIcon>
                                            <FolderIcon />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary="Vizualizarea domeniilor profesoriilor in vederea colaborarilor cu teme proprii "
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <FolderIcon />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary="Transparenta privind colaborarile. Studentul poate sa vada cererile de colaborare care sunt refuzate. "
                                        />
                                    </ListItem>
                                </List>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2bh-content"
                                id="panel2bh-header"
                            >
                                <GavelIcon/>
                                <Typography className={classes.heading}>Reguli</Typography>

                            </AccordionSummary>
                            <AccordionDetails>
                                <List dense>
                                    <ListItem>
                                        <ListItemIcon>
                                            <FolderIcon />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary="Un student poate avea o singura colaborare cu un singur profesor!"
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <FolderIcon />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary="Un student poate o singura cerere de colaborare activa in revizuire la un moment dat! Doar dupa acceptarea/refuzarea cerereii de catre profesor studentul poate face din nou cereri"
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <FolderIcon />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary="Nu se pot alege teme la care lucreaza alt student momentan! "
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <FolderIcon />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary="Momentan din lipsa unui canal de comunicare cu profesorul pe platforma nu se permite renuntarea la o colaborare acceptata de catre student sau profesor"
                                        />
                                    </ListItem>
                                </List>
                            </AccordionDetails>
                        </Accordion>
                    </Paper>
                </Box>
            </Box>
        </Box>
    )
}