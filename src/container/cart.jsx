import React, { useState, useEffect } from "react";
import '../styles/cart.css'

import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { Button, CircularProgress } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import GetCartItems from "../services/showCart";
import RemoveItemFromCart from "../services/deleteFromCart";
import Header from "../components/header";
import Footer from "../components/footer";
import PostNewOrder from "../services/postNewOrder";
import { useAlert } from "../components/AlertContext";
import UpdateCart from "../services/updateCart";



export default function Cart() {
    const showAlert = useAlert();

    const userId = JSON.parse(localStorage.getItem('user')).id;

    // const [cartItems, setCartItems] = useState([
    //     { name: 'Coca Cola 1L', quantity: 5, price: 250, image: 'cocacola.png' },
    //     { name: 'Chips', quantity: 3, price: 150, image: 'chips.png' },
    //     { name: 'Pizza', quantity: 2, price: 400, image: 'pizza.png' },
    //     { name: 'Apples', quantity: 8, price: 120, image: 'apples.png' },
    //     { name: 'Bananas', quantity: 10, price: 80, image: 'bananas.png' },
    //     { name: 'Burger', quantity: 2, price: 300, image: 'burger.png' },
    //     { name: 'Ice Cream', quantity: 4, price: 200, image: 'icecream.png' },
    //     { name: 'Cookies', quantity: 5, price: 100, image: 'cookies.png' },
    //     { name: 'Milk', quantity: 6, price: 60, image: 'milk.png' },
    //     { name: 'Toothpaste', quantity: 2, price: 50, image: 'toothpaste.png' },
    // ]);


    const [cartItems, setCartItems] = useState([]);

    const fetchUserCart = async () => {
        await GetCartItems(userId)
        .then((response) => {
            setCartItems(response);
        })
        .catch((error) => {
            showAlert("Error fetching cart items", "error");
        });
        toggleLoading(false);
    };

    useEffect(() => {
        toggleLoading(true);
        fetchUserCart();
    }, []);

    const handleCreateNewOrder = async (cartId) => {
        const newOrder = await PostNewOrder(cartId);
    
        // If the new order is successfully created, you might want to take additional actions
        if (newOrder) {
          console.log('New order created:', newOrder);
          // Update local state or navigate to the order details page
          setCartItems([]);
        }
      };

    const updateQuantity = (index, newQuantity) => {
        const updatedItems = [...cartItems];
        updatedItems[index].quantity = newQuantity;
        setCartItems(updatedItems);
    };

    const removeItem = async(index,productId) => {
        const updatedItems = [...cartItems];
        updatedItems.splice(index, 1);
        setCartItems(updatedItems);
        showAlert("Item removed from cart", "success");

        const response = await RemoveItemFromCart(productId,userId);
        console.log(response);
        if (response) {
            console.log('Item removed from cart:', response);
        }
        else{
            showAlert("Error removing item from cart", "error");
            fetchUserCart();
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
        handleCreateNewOrder(userId);
        // console.log("Updated Cart Items:", cartItems);
        setOpenDialog(false);
        
    };

    const [grandTotal, setGrandTotal] = useState(0);

    useEffect(() => {
        // Calculate the grand total based on cart items
        if (cartItems === null || cartItems.length === 0) {
            return;
        }
        const total = cartItems.reduce((sum, item) => sum + (item.quantity * item.price), 0);
        setGrandTotal(total);
    }, [cartItems]);


    const toggleLoading = (isLoading) => {
        if (isLoading) {
            document.getElementById('cartLoading').style.display = 'block';
        } 
        else {
            document.getElementById('cartLoading').style.display = 'none';
        }
    }

    const saveQuantity = async (productId, newQuantity) => {
        const response = await UpdateCart(userId, productId, newQuantity)
        if (response) {
            console.log('Quantity updated:', response);
            showAlert("Quantity updated", "success");
        }
        else{
            showAlert("Error updating quantity", "error");
            fetchUserCart();
        }
    };


    return (
        <>
            <Header/>
        <div style={{margin:'0 50px'}}>
            <h2>Your Cart</h2>
            <CircularProgress size={30} thickness={4} style={{ display: 'none' }} id="cartLoading"/>
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
                {cartItems.length === 0 && <h3 className="product-name">Nothing Here :<br />Please add items to your cart.</h3>}
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
                                    <img className='item-image-cart' src={item.image} alt={item.name} />
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
                                        onBlur={(e) => {
                                            saveQuantity(item.productId, parseInt(e.target.value));
                                        }}
                                    />
                                </td>
                                <td>
                                    <h4 className="product-subtotal">Rs.{item.quantity * item.price}</h4>
                                </td>
                                <td>
                                    <IconButton aria-label="delete" onClick={()=>removeItem(index,item.productId)} >
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
