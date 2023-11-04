import * as React from 'react';
import '../styles/shop.css'

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Box, Button, Card, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import categoryh1 from '../assets/categoryh1.png'
import ItemCard from '../components/itemCard';

export default function Shop() {
    const allProducts = [
        { title: 'Maggie', category: "food" },
        { title: 'Milo', category: "Drinks" },
        { title: 'Cream Cracker', category: "Biscuit" },
    ];

    const title = 'asad';
    return (
        <Box sx={{ m: '0px 60px' }} >
            <Box sx={{ display: 'flex', justifyContent: 'center', m: "50px" }}>
                <Box border={3}
                    sx={{
                        borderColor: '#bce3c9',
                        borderRadius: '10px',
                        p: "10px", width: "50%",
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: '#ffffff'
                    }}>

                    <Autocomplete
                        id="productSearch"
                        freeSolo
                        options={allProducts.map((option) => option.title)}
                        renderInput={(params) =>
                            <TextField variant='standard' color='success' fullWidth
                                {...params} label="Search products..." />}
                        sx={{ width: "100%" }}
                        onChange={(event, value) => {

                            if (value) {

                                console.log(`Selected item: ${value}`);
                            }
                        }}
                    />
                    <SearchIcon fontSize='large' color='success' />
                </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between',gap:"20px" }}>

                <Paper elevation={0} sx={{ minWidth: "200px", width: '30%', backgroundColor: '#f1ead9', textAlign: 'left', p: "10px 30px", borderRadius: "10px" }}>
                    <Box sx={{ display: 'flex', gap: "10px", justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box>
                            <h2 sx={{ width: "50%" }}>Shop the Best Electronics </h2>
                            <Button variant='contained' color='success' sx={{ backgroundColor: "#3bb77e" }}>Shop Now</Button>
                        </Box>
                        <img src={categoryh1} alt="Category" style={{ height: "150px" }} />
                    </Box>
                </Paper>
                <Paper elevation={0} sx={{ minWidth: "200px", width: '30%', backgroundColor: '#f4eaea', textAlign: 'left', p: "10px 30px", borderRadius: "10px" }}>
                    <Box sx={{ display: 'flex', gap: "10px", justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box>
                            <h2 sx={{ width: "50%" }}>Your Favourite Groceries </h2>
                            <Button variant='contained' color='success' sx={{ backgroundColor: "#3bb77e" }}>Shop Now</Button>
                        </Box>
                        <img src={categoryh1} alt="Category" style={{ height: "150px" }} />
                    </Box>
                </Paper>
                <Paper elevation={0} sx={{ minWidth: "200px", width: '30%', backgroundColor: '#e9ecf4', textAlign: 'left', p: "10px 30px", borderRadius: "10px" }}>
                    <Box sx={{ display: 'flex', gap: "10px", justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box>
                            <h2 sx={{ width: "50%" }}>Eat Fresh Fruits & Vegetables</h2>
                            <Button variant='contained' color='success' sx={{ backgroundColor: "#3bb77e" }}>Shop Now</Button>
                        </Box>
                        <img src={categoryh1} alt="Category" style={{ height: "150px" }} />
                    </Box>
                </Paper>
            </Box>
            
            <div className="popular-products">
                <div className="popular-title">
                    <h1> Popular Products </h1>
                </div>
                <ItemCard/>
            </div>
                
                 

        </Box>

    );
}

