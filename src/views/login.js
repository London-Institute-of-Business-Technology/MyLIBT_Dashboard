import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import Button from '@mui/material/Button';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();

    return <Button
        variant="text"
        onClick={() => loginWithRedirect()}
        style={{
            color: '#020c1f',
            borderRadius: '0px',
            textTransform: 'capitalize',
            fontWeight: '400'
        }}
        startIcon={<PersonOutlineOutlinedIcon />}
    >
        Log In
    </Button>;
};

export default LoginButton;