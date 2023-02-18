import { useAuth0 } from "@auth0/auth0-react";
import React from 'react';
import { styled } from '@mui/system';
import { makeStyles } from '@mui/styles';
import { unstable_styleFunctionSx } from '@mui/system';
import Container from '@mui/material/Container';
import ISO from './images/QMS_Logo.png'
import CMI from './images/CMI Recognised-w.png'
import IOM from './images/IMCC_Logo-p-500.png'

export default function Footer() {
    const classes = useStyles();
    const { user, isAuthenticated, isLoading } = useAuth0();

    const Div = styled('div')(unstable_styleFunctionSx);
    const Span = styled('span')(unstable_styleFunctionSx);

    return (
        <>

            <div className={isAuthenticated ? classes.footerBar : classes.footerBarAb}>
                <Container maxWidth="lg" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center' }}>
                    <Div className={classes.logoSet} sx={{ justifyContent: { xs: 'space-between', sm: 'flex-start', md: 'flex-start' } }} >
                        <img src={ISO} alt="" className={classes.footerLogo} />
                        <img src={CMI} alt="" className={classes.footerLogo} />
                        <img src={IOM} alt="" className={classes.footerLogo} />
                    </Div>
                </Container>
                <div style={{ fontSize: '14px', marginTop: '20px', padding: '0 10px' }} >Copyright {new Date().getFullYear()} - London Institute of Business and Technology - All Rights Reserved.</div>
            </div>

        </>
    );

};

const useStyles = makeStyles({
    footerBar: {

        background: '#020c1f',
        bottom: '0px',
        color: '#4e5d78',
        width: '100%',
        textAlign: 'center',
        paddingBottom: '20px',
        marginTop: 'auto'

    },
    footerBarAb: {
        background: '#020c1f',
        bottom: '0px',
        color: '#4e5d78',
        width: '100%',
        position: 'absolute',
        textAlign: 'center',
        paddingBottom: '20px'
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

    externalLink: {
        color: '#000',
        textDecoration: 'none',
        fontSize: '14px',
        '&:hover': {
            cursor: 'pointer',
            color: '#fff',
        }
    },
    footerLogo: {
        maxHeight: '49px',
        marginRight: '10px',
        marginBottom: '15px',
        marginTop: '5px'
    },
    footerLogo2: {
        maxWidth: '99px',
        marginRight: '10px'
    },
    logoSet: {
        borderBottomWidth: '1px',
        borderColor: '#12233f',
        borderBottomStyle: 'solid',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '20px 0',
        flexWrap: 'wrap'

    },
    logoSet2: {
        borderBottomWidth: '1px',
        borderColor: '#12233f',
        borderBottomStyle: 'solid',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '20px 0',
        marginBottom: '20px'

    }
});