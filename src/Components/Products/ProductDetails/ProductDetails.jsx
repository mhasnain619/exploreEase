import React from 'react';
import { useParams } from 'react-router-dom';
import { Data } from '../../../Data';
import { Grid, Box, Typography, Select, MenuItem, Button } from '@mui/material';
import { FaStar } from 'react-icons/fa';
import './ProductCardDetail.css';

const CardDetail = () => {
    let { id } = useParams();
    let details = Data.find(e => e.id == id);

    return (
        <Box className='mainBox' sx={{ my: { xs: 5, md: 10 }, px: { xs: 2, sm: 3, md: 0 } }}>
            <Grid container spacing={4} justifyContent="center">

                {/* Left Side - Image */}
                <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Box sx={{ width: { xs: '100%', sm: 500, md: 500 }, height: { xs: 'auto', sm: 400, md: 500 } }}>
                        <img
                            src={details.image}
                            alt="Product"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'contain',
                            }}
                        />
                    </Box>
                </Grid>

                {/* Right Side - Product Details */}
                <Grid item xs={12} md={6} sx={{ px: { xs: 2, sm: 3, md: 4 }, textAlign: { xs: 'start', md: 'left' } }}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                        {details.title}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                        Category : {details.category}
                    </Typography>
                    {/* Rating and Reviews */}
                    <Box sx={{ mt: 1 }}>
                        {[...Array(5)].map((_, i) => (
                            <FaStar
                                key={i}
                                style={{ fontSize: '20px', color: i < Math.floor(details.rating.rate) ? "#EABE12" : "#ccc" }}
                            />
                        ))}
                        <Typography variant="body2" sx={{ mt: 1 }}>
                            {details.rating.count} reviews
                        </Typography>
                    </Box>

                    {/* Price */}
                    <Typography variant="h4" sx={{ mt: 2, color: 'red', fontWeight: 'bold' }}>
                        ${details.price}
                    </Typography>

                    <hr />

                    {/* Color Options */}
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Color:</Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                            {["#000", "#FFF", "#BEE0A9", "#FFB6C1", "#34495E"].map((color, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        background: color,
                                        display: 'inline-block',
                                        width: 30,
                                        height: 30,
                                        borderRadius: '50%',
                                        border: '1px solid #ccc',
                                        cursor: 'pointer',
                                    }}
                                />
                            ))}
                        </Box>
                    </Box>

                    <hr />

                    {/* Size Options */}
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Size:</Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                            {["XXS", "XS", "S", "M", "L", "XL"].map((size, index) => (
                                <Button
                                    key={index}
                                    variant="outlined"
                                    sx={{ fontWeight: 'bold', borderRadius: 2 }}
                                >
                                    {size}
                                </Button>
                            ))}
                        </Box>
                    </Box>

                    <hr />

                    {/* Quantity Select */}
                    <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', justifyContent: { xs: 'start', md: 'flex-start' } }}>
                        <Typography variant="body1" sx={{ fontWeight: 'bold', mr: 1 }}>Quantity:</Typography>
                        <Select value={1} sx={{ width: 100 }}>
                            {[1, 2, 3, 4, 5].map((qty) => (
                                <MenuItem key={qty} value={qty}>{qty}</MenuItem>
                            ))}
                        </Select>
                    </Box>

                    {/* Add to Cart Button */}
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' } }}>
                        <Button variant="contained" size="large"
                            sx={{
                                width: { xs: '100%', sm: 'auto' },
                                backgroundColor: '#007BFF',
                                fontWeight: 'bold',
                                '&:hover': { backgroundColor: '#0056b3' }
                            }}
                        >
                            Add to Cart
                        </Button>
                    </Box>

                    {/* Product Description */}
                    <Box sx={{ mt: 3 }}>
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Description:</Typography>
                        <Typography variant="body2">{details.description}</Typography>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default CardDetail;
