import React from "react";
import categoryh1 from '../assets/categoryh1.png'
import '../styles/ItemCard.css'
import { Paper, Button } from "@mui/material";
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import UpdateCart from "../services/updateCart";
import { useAlert } from "../components/AlertContext";

export default function ItemCard(props) {
    const showAlert = useAlert();

    const name = props.name ;
    const image = props.image;
    const suplier = props.suplier;
    const rating = props.rating;
    const price = props.price;
    const id = props.id;
    const userId = JSON.parse(localStorage.getItem('user')).id;
 
    const addedCart = async() => {
        console.log(userId,id,1);
        await UpdateCart(userId,id,1)
        .then((response) => {
            console.log(response);
            showAlert('Item Added to Cart','success');
        })
        .catch((error) => {
            console.log(error);
            showAlert('Item Not Added to Cart','error');
        });
    }

    return (
        <div className="popular-items-container">
            <Paper className='item-card'>
                <img src={image} className='item-image' alt={name} />
                <Stack spacing={1} sx={{ mt: '20px' }}>
                    <h3 className="item-name">{name}</h3>
                    <span className="suplier"> By
                        <span className="suplier-name"> {suplier}</span>
                    </span>
                    <Rating name="read-only" value={rating} size="small" precision={0.5} readOnly />
                </Stack>
                <div className="price-container">
                    <h2 className="price">
                        Rs.{price}.00
                    </h2>
                </div>
                <Button 
                variant="contained" 
                color='success' 
                startIcon={<AddShoppingCartIcon />} 
                onClick={addedCart}
                sx={{backgroundColor:'#3bb77e'}}
                size="small">
                    Add
                </Button>
            </Paper>

        </div>

    );

}