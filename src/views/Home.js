import { useAuth0 } from "@auth0/auth0-react";
import React, { useState } from "react";
import axios from 'axios';
import PropTypes from 'prop-types';
import AppBar from '../components/AppBar';
import Footer from "../components/Footer";
import Container from '@mui/material/Container';
import { makeStyles } from '@mui/styles';
import Profile from "./profile";
import { Typography } from "@mui/material";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';



// Tab Pannel Function Starts
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
// Tab Pannel Function End

export default function Home() {
    const [value, setValue] = React.useState(0);
    const accessToken = "test"

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const classes = useStyles();
    const { user, isAuthenticated, isLoading } = useAuth0();

    const [loading, setLoading] = useState(false);

    const createXeroContact = async () => {
        try {
            setLoading(true);
            const { email, name } = user;
            const response = await axios.post(
                'https://api.xero.com/api.xro/2.0/Contacts',
                {
                    Contacts: [
                        {
                            Name: name,
                            EmailAddress: email,
                            ContactNumber: '+123456789',
                        },
                    ],
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            console.log(response.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    if (isAuthenticated && !loading) {
        createXeroContact();
    }


    return (

        <>
            <AppBar />
            <Container maxWidth="lg">
                <div className={classes.centeredContainer} >
                    {
                        isLoading ? 'Loading' :
                            isAuthenticated ?
                                <>
                                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                        <Tabs
                                            value={value}
                                            onChange={handleChange}
                                            variant="scrollable"
                                            scrollButtons
                                            allowScrollButtonsMobile
                                            aria-label="basic tabs example"
                                        >
                                            <Tab label="Dashboard" {...a11yProps(0)} />
                                            <Tab label="Profile" {...a11yProps(1)} />
                                            <Tab label="Invoices" {...a11yProps(2)} />
                                        </Tabs>
                                    </Box>
                                    <TabPanel value={value} index={0}>
                                        <Typography variant="h2">Dashboard</Typography>
                                    </TabPanel>
                                    <TabPanel value={value} index={1}>
                                        <Profile />
                                    </TabPanel>
                                    <TabPanel value={value} index={2}>
                                        <Typography variant="h2">Invoices</Typography>
                                    </TabPanel>

                                </>
                                :
                                <div style={{ marginTop: '25px' }}>
                                    <Typography>Please login to view more details</Typography>
                                </div>
                    }

                </div>
            </Container>
            <Footer />
        </>

    )

};

const useStyles = makeStyles({
    centeredContainer: {

        // display: 'flex',
        // flexDirection: 'row',
        // justifyContent: 'center',
        // alignItems: 'center',


    },

});

