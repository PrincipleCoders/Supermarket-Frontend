import React, { useState, useEffect } from "react";
import '../styles/cart.css'

import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import GetCartItems from "../services/showCart";
import RemoveItemFromCart from "../services/deleteFromCart";
import Header from "../components/header";
import Footer from "../components/footer";


export default function Cart({showAlert}) {
    const [cartItems, setCartItems] = useState([
        { name: 'Coca Cola 1L', quantity: 5, price: 250, image: 'cocacola.png' },
        { name: 'Chips', quantity: 3, price: 150, image: 'chips.png' },
        { name: 'Pizza', quantity: 2, price: 400, image: 'pizza.png' },
        { name: 'Apples', quantity: 8, price: 120, image: 'apples.png' },
        { name: 'Bananas', quantity: 10, price: 80, image: 'bananas.png' },
        { name: 'Burger', quantity: 2, price: 300, image: 'burger.png' },
        { name: 'Ice Cream', quantity: 4, price: 200, image: 'icecream.png' },
        { name: 'Cookies', quantity: 5, price: 100, image: 'cookies.png' },
        { name: 'Milk', quantity: 6, price: 60, image: 'milk.png' },
        { name: 'Toothpaste', quantity: 2, price: 50, image: 'toothpaste.png' },
    ]);

    // const [cartItems, setCartItems] = useState([]);

    // useEffect(() => {
    //     const fetchUserCart = async () => {
    //         const cart = await GetCartItems();
    //         if (cart) {
    //             setCartItems(cart);
    //         }
    //     };
    //     fetchUserCart();
    // }, []);

    const updateQuantity = (index, newQuantity) => {
        const updatedItems = [...cartItems];
        updatedItems[index].quantity = newQuantity;
        setCartItems(updatedItems);
        
    };

    const removeItem = async(index,itemId) => {
        const updatedItems = [...cartItems];
        updatedItems.splice(index, 1);
        setCartItems(updatedItems);
        const result = await RemoveItemFromCart(itemId);
        if (result) {
            console.log('Item removed:', result);
          }
    };

    const [openDialog, setOpenDialog] = useState(false);

    const handleConfirmOrder = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleConfirmYes = () => {
        console.log("Updated Cart Items:", cartItems);
        setOpenDialog(false);
        setCartItems([]);
    };

    const [grandTotal, setGrandTotal] = useState(0);

    useEffect(() => {
        // Calculate the grand total based on cart items
        const total = cartItems.reduce((sum, item) => sum + (item.quantity * item.price), 0);
        setGrandTotal(total);
    }, [cartItems]);


    return (
        <>
            <Header/>
        <div style={{margin:'0 50px'}}>
            <h2>Your Cart</h2>
            <div className="cart-header">
                {cartItems.length != 0 && <h3 className="grand-total"> Total: Rs.{grandTotal}</h3>}
                {cartItems.length != 0 && <Button
                    variant='contained'
                    color='success'
                    sx={{ backgroundColor: "#3bb77e", height: '35px' }}
                    size="small"
                    disabled={cartItems.length === 0}
                    onClick={handleConfirmOrder}
                >
                    Confirm Order
                </Button>}
            </div>
            <div className="cart-container">
                {cartItems.length === 0 && <h3 className="product-name">Nothing Here :( <br />Please add items to your cart.</h3>}
                {cartItems.length != 0 && <table className="cart-tabel">
                    <thead>
                        <tr className="headding">
                            <th>Product</th>
                            <th style={{ textAlign: "left", paddingLeft: '25px' }}>Name</th>
                            <th>Unit Price</th>
                            <th>Quantity</th>
                            <th>Sub total</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map((item, index) => (
                            <tr key={item.name}>
                                <td>
                                    <img className='item-image-cart' src={`/src/assets/categoryh1.png`} alt={item.name} />
                                </td>
                                <td>
                                    <h4 className="product-name">{item.name}</h4>
                                </td>
                                <td>
                                    <h4 className="product-price">Rs.{item.price}</h4>
                                </td>
                                <td>
                                    <TextField
                                        type="number"
                                        value={item.quantity}
                                        onChange={(e) => {
                                            const newQuantity = parseInt(e.target.value);
                                            if (!isNaN(newQuantity) && newQuantity >= 1) {
                                                updateQuantity(index, newQuantity);
                                            }
                                        }}
                                        color='success'
                                        sx={{ width: '70px' }}
                                        size="small"
                                    />
                                </td>
                                <td>
                                    <h4 className="product-subtotal">Rs.{item.quantity * item.price}</h4>
                                </td>
                                <td>
                                    <IconButton aria-label="delete" onClick={() => removeItem(index,item.id)}>
                                        <RemoveCircleOutlineIcon fontSize="inherit" />
                                    </IconButton>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>}
            </div>

            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
            >
                <DialogTitle>Are you sure?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Do you want to confirm your order?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="success">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmYes} color="success" variant="contained">
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>

        </div>
        <Footer/>
        </>
    );
}
