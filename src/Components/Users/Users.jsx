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
        return <div>Loading...</div>;
    }
    const handleDetail = (id) => {
        navigate(`/dashboard/users/${id}`);
    };

    return (
        <Grid container spacing={2} sx={{ justifyContent: 'center', padding: 2 }}>
            {userData &&
                userData.map((user, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                        <Card sx={{ width: '100%', padding: 1 }}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={userImg}
                                    alt={user.username}
                                />
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
                                <Button onClick={() => handleDetail(user.id)} size="small" color="primary">
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
