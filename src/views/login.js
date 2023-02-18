import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import Button from '@mui/material/Button';

const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();

    return <Button
        variant="contained"
        onClick={() => loginWithRedirect()}
        style={{
            background: '#ffab00',
            borderRadius: '0px'
        }}
    >
        Sign In
    </Button>;
};

export default LoginButton;