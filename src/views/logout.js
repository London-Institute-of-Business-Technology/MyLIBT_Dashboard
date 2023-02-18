import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import Typography from '@mui/material/Typography';

const LogoutButton = () => {
    const { logout } = useAuth0();

    return (
        <Typography onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
            Sign out
        </Typography>
    );
};

export default LogoutButton;