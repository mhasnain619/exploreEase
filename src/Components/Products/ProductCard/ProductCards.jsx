import React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import { Data } from '../../../Data';
import './ProductCard.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../Store/Slices/AddToCartSlice';

const ProductCards = () => {
    const navigate = useNavigate()
    const dispacth = useDispatch()
    const handleBuyNow = (id) => {
        navigate(`/products/${id}`)
    };
    const handleAToCart = (product) => {
        dispacth(addToCart({
            id: product.id,
            name: product.title,
            price: product.price,
            image: product.image,
        }))

    }

    return (
        <Grid container sx={{ my: 4 }} spacing={2} className="product-grid">
            {Data &&
                Data.map((user, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                        <Card className="product-card">
                            <CardActionArea sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
                                <Box className='userImgdiv'>
                                    <img alt={user.title} height='100%' width='100%' src={user.image} />
                                </Box>

                            </CardActionArea>
                            <CardContent className="card-content">
                                <Typography
                                    // gutterBottom
                                    // variant="subtitle"
                                    component="div"
                                    className="product-card-title"
                                >
                                    {user.title}
                                </Typography>

                            </CardContent>
                            <Box sx={{ display: 'flex' }}>
                                <Button
                                    size='small'
                                    variant="contained"
                                    onClick={() => handleAToCart(user)}
                                    className="product-card-button"
                                >
                                    Addtocart
                                </Button>
                                <Button
                                    size='small'
                                    variant="contained"
                                    onClick={() => handleBuyNow(user.id)}
                                    className="product-card-button"
                                >
                                    View Details
                                </Button>
                            </Box>
                        </Card>
                    </Grid>
                ))}
        </Grid>
    );
};

export default ProductCards;
