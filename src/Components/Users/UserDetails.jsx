import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Typography, Avatar, Button, Grid, Box } from '@mui/material';
import userImg from '../../assets/userimg.png';
import CircularProgress from '@mui/material/CircularProgress';

import {
    Business as BusinessIcon,
    Email as EmailIcon,
    Phone as PhoneIcon,
    LocationOn as LocationOnIcon,
    Language as LanguageIcon,
} from '@mui/icons-material';
import './UserDetails.css';

const UserDetails = () => {
    const { id } = useParams();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
                const data = await response.json();
                setUserData(data);
            } catch (error) {
                console.error('Failed to fetch user data:', error);
            }
        };

        getData();
    }, [id]);

    if (!userData) {
        return <CircularProgress sx={{ marginTop: '300px', marginLeft: '300px' }} />
    }

    return (
        <Box sx={{ py: 7 }} className="user-details-container">
            <Card className="user-card">
                <Grid container spacing={3}>
                    {/* User Avatar and Basic Info */}
                    <Grid item xs={12} md={3} display="flex" justifyContent="center" alignItems="center">
                        <Avatar alt={userData.name} src={userImg} className="user-avatar" />
                    </Grid>
                    <Grid item xs={12} md={9}>
                        <Typography variant="h3" fontWeight="bold">
                            {userData.name}
                        </Typography>
                        <Typography variant="h5" color="textSecondary">
                            {userData.username} | {userData.company.name}
                        </Typography>
                        <Grid container spacing={2} marginTop={0}>
                            <Grid item>
                                <Button variant="contained" color="primary" size="medium" className="public-profile-btn">
                                    View Public Profile
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button variant="contained" color="secondary" size="medium" className="send-message-btn">
                                    Send Message
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                {/* Additional User Details */}
                <CardContent className="card-content">
                    <Grid container spacing={1}>
                        {/* Company Details */}
                        <Grid item xs={12}>

                            <Box style={{ textAlign: 'start' }}>
                                <p style={{ fontSize: '20px', textAlign: 'start' }}>Company Details :</p>
                                <p >
                                    <BusinessIcon className="section-icon" fontSize="small" />
                                    {userData.company.name}
                                </p>
                                <p>{userData.company.catchPhrase}</p>
                            </Box>
                        </Grid>

                        {/* Contact Information */}
                        <Grid item xs={12}>
                            <Box style={{ textAlign: 'start' }}>
                                <p style={{ fontSize: '20px', textAlign: 'start' }}>
                                    Contact Information :
                                </p>
                                <p>
                                    <EmailIcon className="section-icon" fontSize="small" />
                                    {userData.email}
                                </p>
                                <p>
                                    <PhoneIcon className="section-icon" fontSize="small" />
                                    {userData.phone}
                                </p>
                                <p>
                                    <LanguageIcon className="section-icon" fontSize="small" />
                                    {userData.website}
                                </p>
                            </Box>
                        </Grid>

                        {/* Address */}
                        <Grid item xs={12}>
                            <Box style={{ textAlign: 'start' }}>
                                <p style={{ fontSize: '20px', textAlign: 'start' }}>Address :</p>
                                <p>
                                    {`${userData.address.street}, ${userData.address.suite}, ${userData.address.city}, ${userData.address.zipcode}`}
                                </p>
                            </Box>

                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Box>
    );
};

export default UserDetails;
