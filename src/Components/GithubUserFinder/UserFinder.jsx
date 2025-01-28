import React, { useEffect, useState } from "react";
import { TextField, Button, Card, CardContent, Typography, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ProfileCard from '../GithubUserFinder/UserCard'
const GitHubProfileSearch = () => {
    const [username, setUsername] = useState("");
    const [profile, setProfile] = useState(null);
    let navigate = useNavigate()

    const handleSearch = async () => {
        try {
            const res = await axios.get(`https://api.github.com/users/${username}`);
            setProfile(res.data);
            navigate(`/profile/${username}`)

        } catch (error) {
            console.error("Error fetching profile:", error);
        }
    };
    console.log(profile);


    return (
        <>
            <Box display="flex" justifyContent="center" alignItems="center" height='100vh' >
                <Card sx={{ maxWidth: 500, textAlign: "center", p: 3, borderRadius: "16px", boxShadow: 3 }}>
                    <CardContent>
                        <Typography variant="h5" fontWeight="bold" gutterBottom>
                            GitHub Profile Search
                        </Typography>
                        <Typography variant="body2" color="textSecondary" gutterBottom>
                            Enter a GitHub username to view the most recent statistics.
                        </Typography>
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Enter a GitHub username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            sx={{ my: 2, background: "#f1f3f4", borderRadius: "8px" }}
                        />
                        <Button
                            size="large"
                            variant="contained"
                            startIcon={<SearchIcon />}
                            sx={{ width: '100%', backgroundColor: "#333", color: "white", borderRadius: "8px", px: 3 }}
                            onClick={handleSearch}
                        >
                            Search GitHub Profile
                        </Button>
                        {profile && <ProfileCard profile={profile} />}
                        <Typography variant="caption" color="textSecondary" display="block" sx={{ mt: 2 }}>
                            Script created by Ananitay
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
        </>
    );
};

export default GitHubProfileSearch;
