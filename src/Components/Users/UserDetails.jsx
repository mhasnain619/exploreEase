import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Typography, Avatar, Button, Grid, Box } from '@mui/material';
import userImg from '../../assets/userimg.png';
import CircularProgress from '@mui/material/CircularProgress';
import { FaLocationDot } from "react-icons/fa6";

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


    return (
        <Box sx={{ py: 8 }}>
            {userData ?
                <Card className="user-card">
                    <Grid container spacing={3}>
                        {/* User Avatar and Basic Info */}
                        <Grid item xs={12} md={3} display="flex" justifyContent="center" alignItems="center">
                            <Avatar alt={userData.name} src={userImg} className="user-avatar" />
                        </Grid>
                        <Grid item xs={12} md={9}>
                            <Typography className='userName'>
                                {userData.name}
                            </Typography>
                            <Typography className='userNameSngCompany'>
                                {userData.username} | {userData.company.name}
                            </Typography>
                            <Grid container spacing={2} marginTop={0} direction={{ xs: "column", sm: "row" }} >
                                <Grid item xs={12} sm="auto">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                        className="public-profile-btn"
                                        fullWidth
                                    >
                                        View Public Profile
                                    </Button>
                                </Grid>
                                <Grid item xs={12} sm="auto">
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        size="large"
                                        className="send-message-btn"
                                        fullWidth
                                    >
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
                            <Grid item xs={12} md={4}>
                                <Box style={{ textAlign: 'start' }}>
                                    <p className='nameContAddre'>Company Details :</p>
                                    <span className='iconAndText'>
                                        <BusinessIcon className="section-icon" fontSize="small" />
                                        <p>  {userData.company.name}</p>
                                    </span>
                                    <p>{userData.company.catchPhrase}</p>
                                </Box>
                            </Grid>

                            {/* Contact Information */}
                            <Grid item xs={12} md={4}>
                                <Box style={{ textAlign: 'start' }}>
                                    <p className='nameContAddre'>
                                        Contact Information :
                                    </p>
                                    <span className='iconAndText'>
                                        <EmailIcon className="section-icon" fontSize="small" />
                                        <p>  {userData.email}</p>
                                    </span>
                                    <span className='iconAndText'>
                                        <PhoneIcon className="section-icon" fontSize="small" />
                                        <p>{userData.phone}</p>
                                    </span>
                                    <span className='iconAndText'>
                                        <LanguageIcon className="section-icon" fontSize="small" />
                                        <p>  {userData.website}</p>
                                    </span>
                                </Box>
                            </Grid>

                            {/* Address */}
                            <Grid item xs={12} md={4}>
                                <Box style={{ textAlign: 'start' }}>
                                    <p className='nameContAddre'>Address :</p>
                                    <span className='Address'>
                                        <FaLocationDot className='locationIcon' />
                                        <p>{`${userData.address.street}, ${userData.address.suite}, ${userData.address.city}, ${userData.address.zipcode}`}</p>
                                    </span>
                                </Box>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card> : userData == [] ?
                    <Typography variant="h6">
                        Data not found...!
                    </Typography>
                    :
                    <CircularProgress />
            }

        </Box>
    );
};

export default UserDetails;
