import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import AppBar from '../components/AppBar';
import Footer from "../components/Footer";
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
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
                            <div style={{ display: 'flex', flexDirection: "row", marginBottom: '15px' }}>
                                <TextField style={{ marginRight: '10px' }} id="outlined-basic" label="Type a job title" variant="outlined" type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)} />
                                <Button
                                    variant="outlined"
                                    type="submit"
                                    disabled={prompt == '' ? true : false}
                                >
                                    Show Books
                                </Button>
                            </div>
                        </form>
                        {isLoadingBooks ? 'Loading' : recommendations.map((item) => (
                            <>
                                <div style={{ marginBottom: '15px' }}>
                                    <Alert icon={<AutoStoriesIcon fontSize="inherit" />} severity="info">
                                        <div style={{ fontWeight: 'bold' }}>{item.title}</div>
                                        <a target="_blank" href={item.amazon_link}>{item.amazon_link}</a>
                                        <a target="_blank" href={item.amazonLink}>{item.amazonLink}</a>
                                    </Alert>

                                </div>
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