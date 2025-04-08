import React from 'react';
import { useSelector } from 'react-redux';
import {
    Box,
    Typography,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    IconButton,
    Button,
    Divider,
    Paper,
    Badge,
    Chip,
    Grid,
    Slide
} from '@mui/material';
import {
    Delete as DeleteIcon,
    Add as AddIcon,
    Remove as RemoveIcon,
    ShoppingCart as ShoppingCartIcon
} from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../../../Store/Slices/AddToCartSlice';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const { cart } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Moved this to the top level

    const handleRemoveItem = (id) => {
        dispatch(removeFromCart(id));
    };

    const handleQuantityChange = (id, change) => {
        dispatch(updateQuantity({ id, change }));
    };

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
    };

    if (cart.length === 0) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mt: '50px',
                    textAlign: 'center',
                    p: 4
                }}
            >
                <ShoppingCartIcon sx={{ fontSize: 80, color: 'text.disabled', mb: 2 }} />
                <Typography variant="h5" color="text.secondary" gutterBottom>
                    Your cart is empty
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                    Start adding some products to your cart
                </Typography>
                <Button
                    onClick={() => navigate('/products')}
                    variant="contained"
                    color="primary"
                    sx={{ borderRadius: 8, px: 4, py: 1 }}
                >
                    Browse Products
                </Button>
            </Box>
        );
    }

    return (
        <Box sx={{ width: '100%', mt: 3, p: { xs: 2, md: 3 } }}>
            <Typography
                variant="h4"
                gutterBottom
                sx={{
                    fontWeight: 700,
                    mt: 4,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2
                }}
            >
                <Badge badgeContent={cart.length} color="primary">
                    <ShoppingCartIcon fontSize="large" />
                </Badge>
                Your Shopping Cart
            </Typography>

            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    <Paper elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
                        <List sx={{ p: 0 }}>
                            {cart.map((item, index) => (
                                <Slide direction="up" in timeout={200 * (index + 1)} key={item.id}>
                                    <div>
                                        <ListItem
                                            sx={{
                                                width: '100%',
                                                // p: 2,
                                                transition: 'all 0.3s ease',
                                                '&:hover': {
                                                    backgroundColor: 'action.hover',
                                                    transform: 'translateY(-2px)'
                                                }
                                            }}
                                            secondaryAction={
                                                <IconButton
                                                    edge="end"
                                                    onClick={() => handleRemoveItem(item.id)}
                                                    aria-label="delete"
                                                    color="error"
                                                    sx={{
                                                        '&:hover': {
                                                            backgroundColor: 'error.light',
                                                            color: 'error.contrastText'
                                                        }
                                                    }}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            }
                                        >
                                            <ListItemAvatar sx={{ minWidth: 80 }}>
                                                <Avatar
                                                    src={item.image}
                                                    alt={item.title}
                                                    variant="rounded"
                                                    sx={{
                                                        width: 80,
                                                        height: 80,
                                                        borderRadius: 2
                                                    }}
                                                />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={
                                                    <Typography
                                                        variant="h6"
                                                        sx={{ color: 'black', fontWeight: 600 }}
                                                    >
                                                        {item.title}
                                                    </Typography>
                                                }
                                                secondary={
                                                    <>
                                                        <Typography variant="body2" color="text.secondary">
                                                            ${item.price.toFixed(2)}
                                                        </Typography>
                                                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                                                            <IconButton
                                                                size="small"
                                                                onClick={() => handleQuantityChange(item.id, -1)}
                                                                disabled={item.quantity <= 1}
                                                            >
                                                                <RemoveIcon fontSize="small" />
                                                            </IconButton>
                                                            <Chip
                                                                label={item.quantity}
                                                                variant="outlined"
                                                                sx={{ mx: 1 }}
                                                            />
                                                            <IconButton
                                                                size="small"
                                                                onClick={() => handleQuantityChange(item.id, 1)}
                                                            >
                                                                <AddIcon fontSize="small" />
                                                            </IconButton>
                                                        </Box>
                                                    </>
                                                }
                                                sx={{ ml: 2 }}
                                            />
                                            <Typography variant="h6" sx={{ fontWeight: 600, minWidth: 100, textAlign: 'right' }}>
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </Typography>
                                        </ListItem>
                                        {index < cart.length - 1 && <Divider />}
                                    </div>
                                </Slide>
                            ))}
                        </List>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Paper elevation={0} sx={{ p: 3, borderRadius: 2 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                            Order Summary
                        </Typography>
                        <Box sx={{ mb: 2 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Typography color="text.secondary">Subtotal</Typography>
                                <Typography>${calculateTotal()}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Typography color="text.secondary">Shipping</Typography>
                                <Typography>Free</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Typography color="text.secondary">Tax</Typography>
                                <Typography>$0.00</Typography>
                            </Box>
                        </Box>
                        <Divider sx={{ my: 2 }} />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                            <Typography variant="h6" sx={{ fontWeight: 700 }}>Total</Typography>
                            <Typography variant="h6" sx={{ fontWeight: 700 }}>${calculateTotal()}</Typography>
                        </Box>
                        <Button
                            fullWidth
                            variant="contained"
                            size="large"
                            sx={{
                                py: 1.5,
                                borderRadius: 2,
                                fontWeight: 700,
                                backgroundColor: 'primary.main',
                                '&:hover': {
                                    backgroundColor: 'primary.dark'
                                }
                            }}
                        >
                            Proceed to Checkout
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Cart;