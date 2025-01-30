import React, { useState } from "react";
import { TextField, Button, Card, CardContent, Typography, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { Avatar, IconButton, Divider, Link, Tooltip } from "@mui/material";
import { LocationOn, Email, GitHub, Twitter } from "@mui/icons-material";
import CircularProgress from '@mui/material/CircularProgress';
import Swal from 'sweetalert2'
import './UserFinder.css'
const GitHubProfileSearch = () => {
    const [username, setUsername] = useState("");
    const [profile, setProfile] = useState(null);
    const [searchClicked, setSearchClicked] = useState(false);
    const [loading, setLoading] = useState(false);  // Added loading state

    const handleSearch = async () => {
        if (!username) {
            Swal.fire("Please add a valid username!");
            return;
        }

        setSearchClicked(true);
        setLoading(true);
        try {
            const res = await axios.get(`https://api.github.com/users/${username}`);
            setProfile(res.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching profile:", error);
            // Swal.fire("User not found....!");
            setProfile('null');
            setLoading(false);
        }
    };

    return (
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height='100vh' >
            {/* User Search Card, initially visible */}
            {!searchClicked && (
                <Card sx={{ maxWidth: 600, textAlign: "center", p: 3, borderRadius: "6px", boxShadow: 3 }}>
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
                            sx={{ width: "100%", backgroundColor: "#333", color: "white", borderRadius: "8px", px: 3 }}
                            onClick={handleSearch}
                        >
                            Search GitHub Profile
                        </Button>
                    </CardContent>
                </Card>
            )}

            {/* Show loading spinner if data is being processed */}
            {loading && (
                <CircularProgress size={60} sx={{ marginTop: 3 }} />
            )}

            {/* GitHub Profile Card, only shown when profile data is available */}
            {profile && searchClicked && !loading && (
                <Card sx={{ maxWidth: 800, borderRadius: 2, boxShadow: 3, padding: 2, marginTop: '50px' }}>
                    <CardContent>
                        <Box className='userFinderBox'>
                            <Avatar src={profile.avatar_url} sx={{ width: 120, height: 120, marginRight: 3 }} />
                            <Box>
                                <Typography variant="h6" fontWeight="bold">
                                    {profile.name || "No Name Provided"}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Hi, my name is {profile.name || "User"} and I am a highly ambitious,
                                    self-motivated frontend developer.
                                </Typography>
                                <Box display="flex" alignItems="center" color="text.secondary">
                                    <LocationOn fontSize="small" /> &nbsp; {profile.location || "Unknown"}
                                </Box>
                                <Box display="flex" alignItems="center" color="text.secondary">
                                    <Email fontSize="small" /> &nbsp; {profile.email || "Not available"}
                                </Box>
                            </Box>
                        </Box>

                        {/* Social Links */}
                        <Box mt={2} display="flex" alignItems="center">
                            <Typography variant="body2" fontWeight="bold">Social Links:</Typography>
                            <Tooltip title="GitHub">
                                <IconButton href={profile.html_url} target="_blank">
                                    <GitHub />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Twitter">
                                <IconButton
                                    href={`https://twitter.com/${profile.twitter_username}`}
                                    target="_blank"
                                    disabled={!profile.twitter_username}
                                >
                                    <Twitter />
                                </IconButton>
                            </Tooltip>
                        </Box>

                        {/* Portfolio */}
                        <Box mt={1}>
                            <Typography variant="body2" fontWeight="bold">
                                Portfolio:{" "}
                                <Link href={profile.blog} target="_blank" color="#6200ea">
                                    {profile.blog ? "Portfolio" : "Not available"}
                                </Link>
                            </Typography>
                        </Box>

                        <Divider sx={{ my: 2 }} />

                        {/* GitHub Stats */}
                        <Box display="flex" justifyContent="space-around">
                            <Box textAlign="center">
                                <Typography variant="h6">{profile.public_repos}</Typography>
                                <Typography variant="body2" color="text.secondary">Repositories</Typography>
                            </Box>
                            <Box textAlign="center">
                                <Typography variant="h6">{profile.followers}</Typography>
                                <Typography variant="body2" color="text.secondary">Followers</Typography>
                            </Box>
                            <Box textAlign="center">
                                <Typography variant="h6">{profile.following}</Typography>
                                <Typography variant="body2" color="text.secondary">Following</Typography>
                            </Box>
                        </Box>

                        <Divider sx={{ my: 2 }} />

                        {/* Latest Repos */}
                        <Box>
                            <Typography variant="body2" fontWeight="bold">Latest Repositories</Typography>
                            <Link
                                href={`https://github.com/${username}?tab=repositories`}
                                target="_blank"
                                color="#000" // FIXED
                                sx={{ p: 1, backgroundColor: "#f3f3f3", display: "block", borderRadius: 1, mt: 1 }}
                            >
                                {`https://github.com/${username}?tab=repositories`}
                            </Link>
                        </Box>
                    </CardContent>
                </Card>
            )}
        </Box>
    );
};

export default GitHubProfileSearch;
