import React from "react"; 
import categoryh1 from '../assets/categoryh1.png'
import '../styles/ItemCard.css'
import { Paper } from "@mui/material";

export default function ItemCard (props){

    const name = "Maggie Chicken Noodles"
    const image = categoryh1;
    const suplier = 'Maas Holdings'

    return (
        <div className="popular-items-container">
            <Paper className='item-card'>
                <img src={image} className='item-image' alt={name}/>
                <h3 className="item-name">{name}</h3>
                <span className="suplier"> <>By</> {suplier}</span>
            </Paper>
        </div>

    );

}