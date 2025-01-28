import React, { useState } from "react";
import { TextField, Button, Card, CardContent, Typography, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";

const GitHubProfileSearch = () => {
    const [username, setUsername] = useState("");
    const [profile, setProfile] = useState(null);

    const handleSearch = async () => {
        try {
            const res = await axios.get(`https://api.github.com/users/${username}`);
            setProfile(res.data);
        } catch (error) {
            console.error("Error fetching profile:", error);
        }
    };

    return (
        <>
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <Card
                    sx={{
                        maxWidth: 500,
                        textAlign: "center",
                        p: 3,
                        borderRadius: "16px",
                        boxShadow: 3,
                    }}
                >
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
                            sx={{
                                my: 2,
                                background: "#f1f3f4",
                                borderRadius: "8px",
                            }}
                        />
                        <Button
                            size="large"
                            variant="contained"
                            startIcon={<SearchIcon />}
                            sx={{
                                width: "100%",
                                backgroundColor: "#333",
                                color: "white",
                                borderRadius: "8px",
                                px: 3,
                            }}
                            onClick={handleSearch}
                        >
                            Search GitHub Profile
                        </Button>
                        {profile && (
                            <Box mt={3}>
                                <Typography variant="h6">{profile.name}</Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {profile.bio || "No bio available"}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Public Repos: {profile.public_repos}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Followers: {profile.followers}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Following: {profile.following}
                                </Typography>
                            </Box>
                        )}
                        <Typography
                            variant="caption"
                            color="textSecondary"
                            display="block"
                            sx={{ mt: 2 }}
                        >
                            Script created by Ananitay
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
        </>
    );
};

export default GitHubProfileSearch;
