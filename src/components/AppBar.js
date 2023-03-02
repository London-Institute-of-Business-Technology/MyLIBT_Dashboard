import { useAuth0 } from "@auth0/auth0-react";
import React from 'react';
import { Link } from "react-router-dom";
import { styled } from '@mui/system';
import { makeStyles } from '@mui/styles';
import { unstable_styleFunctionSx } from '@mui/system';
import { createTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import MainLogo from '../../src/images/LIBT-Logo-white.png';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LoginButton from '../views/login';
import LogoutButton from '../views/logout';
import MainMenu from './mainMenu';

const pages = [];

export default function ResponsiveAppBar() {
    const classes = useStyles();

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };


    const theme = createTheme();

    const Div = styled('div')(unstable_styleFunctionSx);
    const Span = styled('span')(unstable_styleFunctionSx);


    const { user, isAuthenticated, isLoading } = useAuth0();


    return (
        <>
            <div className={classes.topBar}>
                <Container maxWidth="lg" style={{ padding: '0 2%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <div className={classes.flexHr}>
                        {/* <a href="mailto:enquiries@libt.co.uk" className={classes.externalLink}>
                            <EmailOutlinedIcon fontSize='small' />
                            <Span sx={{ display: { xs: 'none', md: 'flex' }, ml: 1 }} >enquiries@libt.co.uk</Span>
                        </a> */}
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {pages.map((page) => (
                                <Button
                                    key={page}
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    {page}
                                </Button>
                            ))}
                        </Box>

                        <Box sx={{ flexGrow: 0 }}>
                            {
                                isLoading ? 'Loading' :
                                    isAuthenticated ?
                                        <>
                                            <IconButton
                                                onClick={handleOpenUserMenu} sx={{ p: 0 }}
                                            >
                                                <Avatar sx={{ width: 24, height: 24 }} className={classes.userAvatar} alt={user.name} src={user.picture} />
                                                <Typography variant="subtitle2" className={classes.userName}>{user.nickname.charAt(0).toUpperCase() + user.nickname.slice(1)}</Typography>
                                            </IconButton>
                                            <Menu
                                                sx={{ mt: '45px' }}
                                                id="menu-appbar"
                                                anchorEl={anchorElUser}
                                                anchorOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'right',
                                                }}
                                                keepMounted
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'right',
                                                }}
                                                open={Boolean(anchorElUser)}
                                                onClose={handleCloseUserMenu}
                                            >
                                                <MenuItem onClick={handleCloseUserMenu}>
                                                    <Link className={classes.styledLink} to="/">Dashboard</Link>
                                                </MenuItem>
                                                <MenuItem onClick={handleCloseUserMenu}>
                                                    <Link className={classes.styledLink} to="/profile">My Profile</Link>
                                                </MenuItem>
                                                <MenuItem onClick={handleCloseUserMenu}>
                                                    <LogoutButton />
                                                </MenuItem>



                                            </Menu></> :
                                        <LoginButton />

                            }

                        </Box>
                    </div>

                </Container>

            </div>
            <AppBar position="static" elevation={0}>

                <Container maxWidth="lg" sx={{ padding: { md: '10px 35px 10px 20px', sm: '10px 20px 10px 20px', xs: '10px 15px 10px 15px' } }}>
                    <Toolbar disableGutters>
                        {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
                        <Div sx={{ display: { xs: 'none', md: 'flex' }, mr: 2 }}>
                            {/* <Link to='/'> */}
                            <img src={MainLogo} alt='LIBT' style={{ maxWidth: '110px' }} />
                            {/* </Link> */}
                        </Div>

                        {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
                        <Div sx={{ display: { xs: 'flex', md: 'none' }, mr: 2, justifyContent: 'flex-start', flexGrow: 1 }}>
                            {/* <Link to='/'> */}
                            <img src={MainLogo} alt='LIBT' style={{ maxWidth: '60px' }} />
                            {/* </Link> */}
                        </Div>
                        <MainMenu />
                    </Toolbar>
                </Container>
            </AppBar>


        </>
    );

};

const useStyles = makeStyles({
    topBar: {
        background: '#ffab00',
        display: 'flex',
        flexDirection: 'row',
        padding: '10px'
    },
    flexHr: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    flexHSB: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    flexV: {
        display: 'flex',
        flexDirection: 'column',
    },
    borderDiv: {
        width: '1px',
        background: 'rgba(0, 0, 0, 0.1)',
        margin: '0 10px',
        height: '35px'
    },
    externalLink: {
        color: '#000',
        textDecoration: 'none',
        fontSize: '14px',
        display: 'flex',
        flexDirection: 'row',
        '&:hover': {
            cursor: 'pointer',
            color: '#fff',
        }
    },
    userName: {
        color: '#0a1c3d',
        fontSize: '12px !important'

    },
    userAvatar: {
        marginRight: '10px'
    },
    styledLink: {
        textDecoration: 'none',
        color: 'rgba(0, 0, 0, 0.87)'
    }
});