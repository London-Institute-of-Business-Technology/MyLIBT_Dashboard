import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ClickAwayListener from '@mui/base/ClickAwayListener';

export default function MainMenu() {

    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const [expanded1, setExpanded1] = React.useState(false);

    const handleChange1 = (panel) => (event, isExpanded1) => {
        setExpanded1(isExpanded1 ? panel : false);
    };

    const [showDiv, setShowDiv] = useState(false);

    const showMenu = () => {
        setShowDiv(!showDiv);
    };

    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorE2, setAnchorE2] = React.useState(null);
    const open = Boolean(anchorEl);
    const open2 = Boolean(anchorE2);

    const handleClick = (event) => {
        if (anchorEl !== event.currentTarget) {
            setAnchorEl(event.currentTarget);
        }

    };

    const handleClick2 = (event) => {
        if (anchorE2 !== event.currentTarget) {
            setAnchorE2(event.currentTarget);
        }
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClose2 = () => {
        setAnchorE2(null);
    };

    return (
        <>
            {/* Menu for desktop */}
            <Box className={classes.menuContainer} sx={{ display: { sm: 'none', xs: 'none', md: 'flex' } }}>
                <div>
                    <Button
                        id="basic-button"
                        aria-owns={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        //aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                        onMouseOver={handleClick}
                        className={classes.menuButton}
                        endIcon={<KeyboardArrowDownIcon />}
                    >
                        Degrees
                    </Button>

                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            onMouseLeave: handleClose,
                        }}
                        PaperProps={{ className: classes.dropDownMenu }}

                    >
                        <MenuItem className={classes.menuItem} onClick={handleClose}>Bachelor’s Degrees</MenuItem>
                        <MenuItem className={classes.menuItem} onClick={handleClose}>Master’s Degrees</MenuItem>
                        <MenuItem className={classes.menuItem} onClick={handleClose}>Top-up Degrees</MenuItem>
                        <MenuItem className={classes.menuItem} onClick={handleClose}>Work-based Degrees</MenuItem>
                        <MenuItem className={classes.menuItem} onClick={handleClose}>
                            <Button
                                variant='contained'
                                fullWidth
                                disableElevation
                                className={classes.flatButton}
                            >
                                All Courses
                            </Button>
                        </MenuItem>
                    </Menu>
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
                    <Button
                        id="basic-button"
                        aria-owns={open2 ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        //aria-expanded={open2 ? 'true' : undefined}
                        onClick={handleClick2}
                        onMouseOver={handleClick2}
                        className={classes.menuButton}
                        endIcon={<KeyboardArrowDownIcon />}
                    >
                        Prospective Students
                    </Button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorE2}
                        open={open2}
                        onClose={handleClose2}
                        MenuListProps={{
                            onMouseLeave: handleClose2,
                        }}
                        PaperProps={{ className: classes.dropDownMenuDefault }}
                    >
                        <MenuItem onClick={handleClose2}>Admission FAQs</MenuItem>
                        <MenuItem onClick={handleClose2}>Assessment Process</MenuItem>
                        <MenuItem onClick={handleClose2}>Recognition of Prior Learning</MenuItem>
                        <MenuItem onClick={handleClose2}>HubSpot for Education</MenuItem>
                        <MenuItem onClick={handleClose2}>Chartered Manager</MenuItem>
                    </Menu>
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
        textTransform: 'capitalize !important'
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
        },
        '& ul li:last-child': {
            padding: '0',
            marginBottom: '2px',
            background: 'transparent',
            marginTop: '20px'
        }
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
            borderRadius: '0px'
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