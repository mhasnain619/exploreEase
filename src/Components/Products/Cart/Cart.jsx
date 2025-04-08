import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography, List, ListItem, ListItemText, ListItemAvatar, Avatar, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
// import { removeFromCart } from '../../../Store/Slices/';

const Cart = () => {
    const cartItems = useSelector(state => state.cart.items);
    const dispatch = useDispatch();

    return (
        <Box>
            <Typography variant="h5">Your Cart</Typography>
            <List>
                {cartItems.map(item => (
                    <ListItem key={item.id} secondaryAction={
                        <IconButton edge="end" onClick={() => dispatch(removeFromCart(item.id))}>
                            <DeleteIcon />
                        </IconButton>
                    }>
                        <ListItemAvatar>
                            <Avatar src={item.image} alt={item.title} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={item.title}
                            secondary={`$${item.price} x ${item.quantity}`}
                        />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default Cart;