import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


export default function MainMenu() {


    const [isOpen, setIsOpen] = useState(false);

    function handleMouseEnter() { setIsOpen(true); }

    function handleMouseLeave() { setIsOpen(false); }

    const [isOpenP, setIsOpenP] = useState(false);

    function handleMouseEnterP() { setIsOpenP(true); }

    function handleMouseLeaveP() { setIsOpenP(false); }


    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const [expanded1, setExpanded1] = React.useState(false);

    const handleChange1 = (panel) => (event, isExpanded1) => {
        setExpanded1(isExpanded1 ? panel : false);
    };

    const [showDiv, setShowDiv] = useState(false);

    const showMenu = () => { setShowDiv(!showDiv); };

    const classes = useStyles();
    // const [anchorEl, setAnchorEl] = React.useState(null);
    // const [anchorE2, setAnchorE2] = React.useState(null);
    // const open = Boolean(anchorEl);
    // const open2 = Boolean(anchorE2);

    // const handleClick = (event) => {
    //     if (anchorEl !== event.currentTarget) {
    //         setAnchorEl(event.currentTarget);
    //     }

    // };

    // const handleClick2 = (event) => {
    //     if (anchorE2 !== event.currentTarget) {
    //         setAnchorE2(event.currentTarget);
    //     }
    // };

    // const handleClose = () => {
    //     setAnchorEl(null);
    // };

    // const handleClose2 = () => {
    //     setAnchorE2(null);
    // };

    return (
        <>

            {/* Menu for desktop */}
            <Box className={classes.menuContainer} sx={{ display: { sm: 'none', xs: 'none', md: 'flex' } }}>

                <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className={classes.menuContainerSingle}>
                    <Button
                        id="basic-button"
                        className={classes.menuButton}
                        endIcon={<KeyboardArrowDownIcon />}
                    >
                        Degrees
                    </Button>

                    {isOpen && (
                        <div className={classes.dropDownMenu}>
                            <ul>
                                <li><a href="#">Bachelor’s Degrees</a></li>
                                <li><a href="#">Master’s Degrees</a></li>
                                <li><a href="#">Top-up Degrees</a></li>
                                <li><a href="#">Work-based Degrees</a></li>
                            </ul>
                            <Box sx={{ mt: 3 }} />
                            <Button
                                variant='contained'
                                fullWidth
                                disableElevation
                                className={classes.flatButton}
                            >
                                All Courses
                            </Button>
                        </div>
                    )}
                </div>



                <div className={classes.separater} />
                <div>
                    <Button
                        onClick={null}
                        className={classes.menuButton}
                    >
                        Diplomas
                    </Button>
                </div>
                <div className={classes.separater} />
                <div>
                    <Button
                        onClick={null}
                        className={classes.menuButton}
                    >
                        Certification & Training
                    </Button>
                </div>
                <div className={classes.separaterBlue} />
                <div>



                    <div onMouseEnter={handleMouseEnterP} onMouseLeave={handleMouseLeaveP} className={classes.menuContainerSingle}>
                        <Button
                            id="basic-button"
                            className={classes.menuButton}
                            endIcon={<KeyboardArrowDownIcon />}
                        >
                            Prospective Students
                        </Button>

                        {isOpenP && (
                            <div className={classes.dropDownMenu} style={{ minWidth: '280px' }}>
                                <ul>
                                    <li><a href="#">Admission FAQs</a></li>
                                    <li><a href="#">Assessment Process</a></li>
                                    <li><a href="#">Recognition of Prior Learning</a></li>
                                    <li><a href="#">HubSpot for Education</a></li>
                                    <li><a href="#">Chartered Manager</a></li>
                                </ul>

                            </div>
                        )}
                    </div>


                </div>

            </Box>
            {/* Menu for desktop end */}


            {/* Right column */}
            <div className={classes.flexHr}>
                <div style={{ minWidth: '130px' }}>
                    <Button
                        variant='contained'
                        fullWidth
                        disableElevation
                        className={classes.flatButton}
                    >
                        Apply Now
                    </Button>
                </div>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: -1, ml: 1, display: { sm: 'block', xs: 'block', md: 'none' } }}
                    onClick={showMenu}
                >
                    <MenuIcon />
                </IconButton>

            </div>
            <Collapse className={classes.mobileMenu} in={showDiv} timeout="auto" unmountOnExit>
                <Accordion elevation={0} expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                        style={{ padding: '0px' }}
                        className={classes.summary}
                    >
                        <Button
                            onClick={null}
                            className={classes.menuButtonMob}
                            fullWidth
                        >
                            Diplomas
                        </Button>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className={classes.mobMenuItem}>Bachelor’s Degrees</div>
                        <div className={classes.mobMenuItem}>Master’s Degrees</div>
                        <div className={classes.mobMenuItem}>Top-up Degrees</div>
                        <div className={classes.mobMenuItem}>Work-based Degrees</div>
                        <div style={{ height: '20px' }} />
                        <Button
                            variant='contained'
                            fullWidth
                            disableElevation
                            className={classes.flatButton}
                        >
                            All Courses
                        </Button>

                    </AccordionDetails>
                </Accordion>



                <div>
                    <Button
                        onClick={null}
                        className={classes.menuButtonMob}
                        fullWidth
                    >
                        Diplomas
                    </Button>
                </div>

                <div>
                    <Button
                        onClick={null}
                        className={classes.menuButtonMob}
                        fullWidth
                    >
                        Certification & Training
                    </Button>
                </div>

                <Accordion className={classes.accordion} elevation={0} expanded={expanded1 === 'panel2'} onChange={handleChange1('panel2')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                        style={{ padding: '0px' }}
                        className={classes.summary}
                    >
                        <Button
                            onClick={null}
                            className={classes.menuButtonMob}
                            fullWidth
                        >
                            Diplomas
                        </Button>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className={classes.mobMenuItem}>Admission FAQs</div>
                        <div className={classes.mobMenuItem}>Assessment Process</div>
                        <div className={classes.mobMenuItem}>Recognition of Prior Learning</div>
                        <div className={classes.mobMenuItem}>HubSpot for Education</div>
                        <div className={classes.mobMenuItem}>Chartered Manager</div>
                    </AccordionDetails>
                </Accordion>
            </Collapse>
        </>
    );
}

const useStyles = makeStyles({
    menuContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: '35px',
        position: 'relative'
    },
    menuContainerSingle: {
        position: 'relative'
    },
    mobileMenu: {
        position: 'absolute',
        background: '#fff',
        top: '74px',
        zIndex: '100',
        width: '100%'
    },
    menuButton: {
        color: '#fff !important',
        '&:hover': {
            color: '#ffab00 !important', // make sure the background color is transparent
        },
        textTransform: 'capitalize !important',
    },
    menuButtonMob: {
        color: '#0a1c3d !important',
        '&:hover': {
            color: '#ffab00 !important', // make sure the background color is transparent
        },
        textTransform: 'capitalize !important',
        display: 'flex !important',
        justifyContent: 'space-between !important'
    },
    dropDownMenu: {
        position: "absolute",
        top: '35px',
        left: '10px',
        zIndex: 10,
        borderRadius: '0px !important',
        padding: '15px',
        minWidth: '255px',
        background: '#fff',
        '& ul': {
            padding: '0',
            margin: '0px',
            listStyle: 'none'

        },
        '& ul li': {
            padding: '6px 55px 6px 15px',
            marginBottom: '2px',
            color: '#201b3d',
            fontSize: '15px',
            background: '#f8faff',

        },
        '& ul li:hover': {
            background: '#ffe3aa',
        },
        '& ul li a': {
            color: '#201b3d',
            textDecoration: 'none',
            fontWeight: 'bold'
        },

        // '& ul li:last-child': {
        //     padding: '0',
        //     marginBottom: '2px',
        //     background: 'transparent',
        //     marginTop: '20px'
        // }
    },
    mobMenuItem: {
        marginBottom: '2px',
        color: '#201b3d',
        fontSize: '15px',
        background: '#f8faff',
        padding: '6px 15px 6px 15px',
        '&:hover': {
            background: '#ffe3aa',
            cursor: 'pointer'
        }
    },
    dropDownMenuDefault: {
        borderRadius: '0px !important',
        padding: '15px',
        minWidth: '255px',
        '& ul li': {
            padding: '6px 55px 6px 15px',
            marginBottom: '2px',
            color: '#201b3d',
            fontSize: '15px',
            background: '#f8faff'
        },
        '& ul li:hover': {
            background: '#ffe3aa',
            borderRadius: '0px',
            cursor: 'pointer'
        },

    },
    flatButton: {
        borderRadius: '0px !important',
        backgroundColor: '#eca107 !important',
        padding: '12px 0 !important;',
        '&:hover': {
            backgroundColor: '#c2870f !important',
        }
    },
    separater: {
        width: '1px',
        height: '50px',
        margin: '0 10px'
    },
    separaterBlue: {
        width: '1px',
        height: '32px',
        background: '#1e345a',
        margin: '0 10px'
    },
    flexHr: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 'auto'
    },
    accordion: {
        boxShadow: 'none',
        '&:before': {
            display: 'none',
        },
        '&$expanded': {
            margin: 0,
        },
    },
    summary: {
        margin: 0,
        '& > .MuiAccordionSummary-content': {
            margin: 0,
        },
    },
});