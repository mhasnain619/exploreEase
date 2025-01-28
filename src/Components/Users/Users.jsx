import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import userImg from '../../assets/userimg.png';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/material';

const Users = () => {
    const [userData, setUserData] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        await axios.get('https://jsonplaceholder.typicode.com/users').then((res) => {
            setUserData(res.data);
        });
    };
    if (!userData) {
        return <CircularProgress />;
    }
    const handleDetail = (id) => {
        navigate(`/users/${id}`);
    };

    return (
        <Grid container spacing={2} sx={{ py: 8, justifyContent: 'center' }}>
            {userData &&
                userData.map((user, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                        <Card sx={{ width: '100%', padding: 1 }}>
                            <CardActionArea>
                                {/* <CardMedia
                                    component="img"
                                    height="140"
                                    image={userImg}
                                    alt={user.username}
                                /> */}
                                <Box sx={{ margin: '0 auto', height: '150px', width: '180px' }}>
                                    <img height='100%' width='100%' src={userImg} alt="" />
                                </Box>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {user.username}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {user.email}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button sx={{ width: '100%' }} onClick={() => handleDetail(user.id)} variant='contained' size="medium" color="primary">
                                    View Details
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
        </Grid>
    );
};

export default Users;
