import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import AppBar from '../components/AppBar';
import Footer from "../components/Footer";
import Container from '@mui/material/Container';
import axios from "axios";

const Profile = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();

    // Chat gpt API -  Recommend books //

    const [prompt, setPrompt] = useState('');
    const [recommendations, setRecommendations] = useState([]);
    const [isLoadingBooks, setIsLoadingBooks] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoadingBooks(true)

        axios
            .post("http://localhost:3000/api/openAI", { 'prompt': prompt })
            .then((res) => {
                setRecommendations(res.data);
                console.log(res.data);
                setIsLoadingBooks(false)
            })
            .catch((err) => {
                console.log(err);
            })
    }


    // Recommend books end

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    return (
        isAuthenticated && (
            <>
                <AppBar />
                <Container maxWidth="lg">
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
                        {/* <ul>
                    {
                        Object.keys(user).map((objkey, i) => (
                            <li key={i}>
                                {objkey}:{user[objkey]}
                            </li>
                        ))
                    }
                </ul> */}

                        <form onSubmit={handleSubmit}>
                            <input type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)} />
                            <button type="submit">Submit</button>
                        </form>
                        {isLoadingBooks ? 'Loading' : recommendations.map((item) => (
                            <>
                                <div>{item.title}</div>
                                <a href={item.amazon_link}>{item.amazon_link}</a>
                            </>

                        ))}

                    </div>
                </Container>
                <Footer />
            </>

        )
    );
};

export default Profile;