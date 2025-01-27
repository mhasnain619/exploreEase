import React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import { Data } from '../../../Data';
import './ProductCard.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';

const ProductCards = () => {
    const navigate = useNavigate()
    const handleBuyNow = (id) => {
        navigate(`/dashboard/products/${id}`)
        console.log(`Buy Now clicked for product with ID: ${id}`);
    };

    return (
        <Grid container spacing={2} className="product-grid">
            {Data &&
                Data.map((user, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                        <Card className="product-card">
                            <CardActionArea sx={{ objectFit: 'cover' }}>
                                <CardMedia
                                    component="img"
                                    className="product-card-img"
                                    image={user.image}
                                    alt={user.title}
                                />

                            </CardActionArea>
                            <CardContent className="card-content">
                                <Typography
                                    gutterBottom
                                    variant="h6"
                                    component="div"
                                    className="product-card-title"
                                >
                                    {user.title}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    className="product-card-category"
                                >
                                    {user.category}
                                </Typography>
                            </CardContent>
                            <Button
                                variant="contained"
                                onClick={() => handleBuyNow(user.id)}
                                className="product-card-button"
                            >
                                View Details
                            </Button>
                        </Card>
                    </Grid>
                ))}
        </Grid>
    );
};

export default ProductCards;
