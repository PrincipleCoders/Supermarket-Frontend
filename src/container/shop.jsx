import * as React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

import '../styles/shop.css'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Box, Button, Card, Paper, Divider } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import categoryh1 from '../assets/categoryh1.png'
import ItemCard from '../components/itemCard';
import AllProducts from '../services/allProducts';
import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";

export default function Shop({showAlert}) {
    // const allProducts = [
    //     { name: 'Maggie', category: 'Food', supplier: 'Nestle', rating: 2.5, price: 450, image: 'image1' },
    //     { name: 'Milo', category: 'Drinks', supplier: 'Nestle', rating: 2.5, price: 260, image: 'image2' },
    //     { name: 'Cream Cracker', category: 'Biscuit', supplier: 'Nestle', rating: 5, price: 125, image: 'image3' },
    //     { name: 'Coca-Cola', category: 'Drinks', supplier: 'Coca-Cola Company', rating: 4.5, price: 150, image: 'image4' },
    //     { name: 'Oreo Cookies', category: 'Biscuit', supplier: 'Mondelez International', rating: 4.8, price: 200, image: 'image5' },
    //     { name: 'Chicken Noodle Soup', category: 'Food', supplier: 'Campbell Soup Company', rating: 4.0, price: 350, image: 'image6' },
    //     { name: 'Pepsi', category: 'Drinks', supplier: 'PepsiCo', rating: 3.5, price: 180, image: 'image7' },
    //     { name: 'Chips Ahoy! Cookies', category: 'Biscuit', supplier: 'Mondelez International', rating: 4.6, price: 220, image: 'image8' },
    //     { name: 'Lays Potato Chips', category: 'Snacks', supplier: 'Frito-Lay', rating: 4.4, price: 170, image: 'image9' },
    //     { name: 'Kit Kat', category: 'Chocolate', supplier: 'Nestle', rating: 4.3, price: 160, image: 'image10' },
    //     { name: 'Spaghetti', category: 'Food', supplier: 'Barilla', rating: 4.7, price: 300, image: 'image11' },
    //     { name: 'Fanta', category: 'Drinks', supplier: 'The Coca-Cola Company', rating: 4.2, price: 160, image: 'image12' },
    //     { name: 'Protello', category: 'Drinks', supplier: 'The Coca-Cola Company', rating: 4.2, price: 160, image: 'image12' },
    //     { name: 'chips', category: 'Drinks', supplier: 'The Coca-Cola Company', rating: 4.2, price: 160, image: 'image12' },
    // ];


    const [allProducts, setAllProducts] = useState([]);

    useEffect(() => {
        const fetchAllProducts = async () => {
            const productList = await AllProducts();
            if (productList) {
                setUserInfo(productList);
            }
        };

        fetchAllProducts();
    }, []);

    const [searchtext, setsearchtext] = useState(null);
    const [searchDone, setsearchDone] = useState(false)
    const [foundItems, setFoundItems] = useState([]);

    const searchProducts = (searchKey) => {

        for (const item of allProducts) {
            if (item.name.toLowerCase().includes(searchKey.toLowerCase())) {
                foundItems.push(item);
            }
        }
        if (foundItems.length > 0) {
            setsearchtext("We found " + foundItems.length + " items for you !")
        }
        else {
            setsearchtext("No products found. ")
        }

        setsearchDone(true);
    }

    const resetSearch = () => {
        setFoundItems([]);
        setsearchDone(false);
        setsearchtext(null);
    };


    return (
        <>
            <Header/>
            <Box sx={{ m: '0px 60px' }} >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        m: "50px 0px",
                        backgroundColor: '#def9ec',
                        p: '40px 0px',
                        borderRadius: '10px'
                    }}>
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
                            options={allProducts.map((option) => option.name)}
                            renderInput={(params) =>
                                <TextField variant='standard' color='success' fullWidth
                                           {...params} label="Search products..." />}
                            sx={{ width: "100%" }}
                            onChange={(event, value) => {

                                if (value) {
                                    searchProducts(value);
                                }
                                else {
                                    resetSearch();
                                }
                            }}
                            onClear={resetSearch}
                        />
                        <SearchIcon fontSize='large' color='success' />


                    </Box>
                </Box>
                {searchDone &&
                    <div className='search-result'>
                        <div className="search-text">
                            {searchtext}
                        </div>
                        <div className="popular-card-container">
                            {foundItems.map((card) => (
                                <ItemCard
                                    key={card.name}
                                    name={card.name}
                                    image={card.image}
                                    suplier={card.supplier}
                                    rating={card.rating}
                                    price={card.price}
                                    ItemId={card.ItemId}
                                />
                            ))}

                        </div>
                    </div>
                }
                <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: "20px" }}>

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
                    <div className="popular-card-container">
                        {allProducts.map((card) => (
                            <ItemCard
                                key={card.name}
                                name={card.name}
                                image={card.image}
                                suplier={card.supplier}
                                rating={card.rating}
                                price={card.price}
                            />
                        ))}
                    </div>

                </div>



            </Box>
            <Footer/>
        </>

    );
}

