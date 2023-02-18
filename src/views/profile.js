import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect } from "react";


const Profile = () => {
    useEffect(() => {
        console.log(user.app_metadata);
    }, [])
    const { user, isAuthenticated, isLoading } = useAuth0();

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    return (
        isAuthenticated && (
            <div style={{ padding: '15px' }}>
                <img style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50px'
                }}
                    src={user.picture}
                    alt={user.name} />
                <h2>{user.name}</h2>
                <p>{user.email}</p>
                <ul>
                    {
                        Object.keys(user).map((objkey, i) => (
                            <li key={i}>
                                {objkey}:{user[objkey]}
                            </li>
                        ))
                    }
                </ul>


            </div>
        )
    );
};

export default Profile;