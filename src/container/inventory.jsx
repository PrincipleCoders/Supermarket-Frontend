import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Box, IconButton, Select, InputLabel } from '@mui/material';
import '../styles/inventory.css';

import AllProducts from '../services/allProducts';
import AddNewProduct from '../services/addNewProduct';
import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";
import UpdateProduct from '../services/updateProduct.jsx';
import DeleteProduct from '../services/deleteProduct.jsx';
import { uploadFile } from '../services/firebase-service';
import { useAlert } from '../components/AlertContext.jsx';
import { CircularProgress } from '@mui/material';

export default function Inventory() {
    const showAlert = useAlert();

    const [searchTerm, setSearchTerm] = useState('');
    const [isAddProductOpen, setIsAddProductOpen] = useState(false);
    const [isEditProductOpen, setIsEditProductOpen] = useState(false);
    const [isDeleteProductOpen, setIsDeleteProductOpen] = useState(false);

    const [newProduct, setNewProduct] = useState({
        name: '',
        quantity: 0,
        price: 0,
        image: '',
        supplier: '',
        category: '',
        rating: 0.0,
        description: '',
        newImage: null,
        id: ''
    });

    useEffect(() => {
        if (newProduct.quantity < 0) {
            setNewProduct(prevProduct => ({ ...prevProduct, quantity: 0 }));
        }
        if (newProduct.price < 0) {
            setNewProduct(prevProduct => ({ ...prevProduct, price: 0 }));
        }
        if (newProduct.rating < 0) {
            setNewProduct(prevProduct => ({ ...prevProduct, rating: 0 }));
        }
        if (newProduct.rating >= 5) {
            setNewProduct(prevProduct => ({ ...prevProduct, rating: 5 }));
        }
    }, [newProduct])



    // const [inventory, setInventory] = useState([
    //     { id: 1001, name: 'Coca Cola 1L', quantity: 5, price: 250, image: 'cocacola.png', supplier: 'Beverages Inc.' },
    //     { id: 1002, name: 'Chips', quantity: 3, price: 150, image: 'chips.png', supplier: 'Snacks and Chips Ltd.' },
    //     { id: 1003, name: 'Pizza', quantity: 2, price: 400, image: 'pizza.png', supplier: 'Pizza Palace' },
    //     { id: 1004, name: 'Apples', quantity: 8, price: 120, image: 'apples.png', supplier: 'Fruit Emporium' },
    //     { id: 1005, name: 'Bananas', quantity: 10, price: 80, image: 'bananas.png', supplier: 'Healthy Harvest' },
    //     { id: 1006, name: 'Burger', quantity: 2, price: 300, image: 'burger.png', supplier: 'Burger Haven' },
    //     { id: 1007, name: 'Ice Cream', quantity: 4, price: 200, image: 'icecream.png', supplier: 'Ice Cream Delights' },
    //     { id: 1008, name: 'Cookies', quantity: 5, price: 100, image: 'cookies.png', supplier: 'Cookie Creations' },
    //     { id: 1009, name: 'Milk', quantity: 6, price: 60, image: 'milk.png', supplier: 'Dairy Farms Ltd.' },
    //     { id: 1010, name: 'Toothpaste', quantity: 2, price: 50, image: 'toothpaste.png', supplier: 'Oral Care Supplies' },
    // ]);

    const [inventory, setInventory] = useState([]);

    const fetchInventoryItems = async () => {
        const allItems = await AllProducts();
        if (allItems) {
            setInventory(allItems);
        }
    };

    useEffect(() => {
        fetchInventoryItems();
    }, []);

    const openAddProductDialog = () => {
        setIsAddProductOpen(true);
    };

    const closeAddProductDialog = () => {
        setIsAddProductOpen(false);
        setNewProduct({
            name: '',
            quantity: 0,
            price: 0,
            image: '',
            supplier: '',
            category: '',
            rating: 0.0,
            description: '',
            newImage: null
        });
    };

    const openEditProductDialog = (product) => {
        setNewProduct(product);
        setIsEditProductOpen(true);
    };

    const closeEditProductDialog = () => {
        setIsEditProductOpen(false);
        setNewProduct({
            name: '',
            quantity: 0,
            price: 0,
            image: '',
            supplier: '',
            category: '',
            rating: 0.0,
            description: '',
            newImage: null
        });
    };
    const openDeleteProductDialog = (product) => {
        setNewProduct(product);
        setIsDeleteProductOpen(true);
    };

    const closeDeleteProductDialog = () => {
        setIsDeleteProductOpen(false);
        setNewProduct({
            name: '',
            quantity: 0,
            price: 0,
            image: '',
            supplier: '',
            category: '',
            rating: 0.0,
            description: '',
            newImage: null
        });
    };


    const columns = [
        { id: 'id', label: 'Id', minWidth: 50, align: 'center' },
        { id: 'image', label: 'Image', minWidth: 100, align: 'center' },
        { id: 'name', label: 'Name', minWidth: 80, align: 'left' },
        { id: 'category', label: 'Category', minWidth: 80, align: 'left' },
        {
            id: 'quantity',
            label: 'Quantity',
            minWidth: 60,
            align: 'center',
        },
        {
            id: 'price',
            label: 'Unit Price',
            minWidth: 100,
        },
        {
            id: 'rating',
            label: 'Rating',
            minWidth: 50,
        },
        {
            id: 'supplier',
            label: 'Supplier',
            minWidth: 100,
        },
        { id: 'edit', label: 'Edit / Delete', minWidth: 50, align: 'center' },
    ];

    const filteredInventory = inventory.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const uploadImage = async (image) => {
        const path = `product/${image.name + Date.now()}`; // path on firebase storage
        const url = await uploadFile(path, image);
        return url;
    }

    const handleAddProduct = async (event) => {
        event.preventDefault();
        toggleLoading(true);

        // Upload the image to firebase storage
        if (newProduct.newImage) {
            await uploadImage(newProduct.newImage)
                .then((url) => {
                    // Add the image url to the new product object
                    console.log(url);
                    newProduct.image = url;
                })
                .catch((error) => {
                    console.error(error);
                    showAlert('Image upload failed', 'error');
                });
        }

        console.log(newProduct);
        // Add the new product to the inventory
        const result = await AddNewProduct(newProduct);
        // If addition is successful, you might want to update the UI or take additional actions
        if (result) {
            fetchInventoryItems();
            console.log('Item added:', result);
            showAlert('Product added successfully', 'success');
            // Update local state or perform other actions
        }
        toggleLoading(false);
        setInventory([...inventory, newProduct]);
        // Close the dialog
        closeAddProductDialog();
        // Reset the new product form
        setNewProduct({
            name: '',
            quantity: 0,
            price: 0,
            image: '',
            supplier: '',
            category: '',
            rating: 0.0,
            description: '',
            id: ''
        });

        console.log(inventory);
        console.log(newProduct);
    };

    const handleUpdate = async () => {
 

         // Upload the image to firebase storage
         if (newProduct.newImage) {
            toggleLoading(true);
            await uploadImage(newProduct.newImage)
                .then((url) => {
                    // Add the image url to the new product object
                    console.log(url);
                    newProduct.image = url;
                })
                .catch((error) => {
                    console.error(error);
                    showAlert('Image upload failed', 'error');
                });
        }
        const result = await  UpdateProduct({...newProduct,newImage:null});
        if (result) {
            fetchInventoryItems();
            console.log('Product updated:', result);
            showAlert('Product Updated successfully', 'success');
        }
        else {
            showAlert('Something went wrong', 'error');
        }
        toggleLoading(false);
 
        setNewProduct({
            name: '',
            quantity: 0,
            price: 0,
            image: '',
            supplier: '',
            category: '',
            rating: 0.0,
            description: ''
        });
        
        closeEditProductDialog();
    };

    const handleDelete = async() =>{
        
        const result = await  DeleteProduct(newProduct.id);
        if (result) {
            fetchInventoryItems();
            console.log('Product deleted:', result);
            showAlert('Product Deleted successfully', 'success');
        }
        else {
            showAlert('Something went wrong', 'error');
        }
     
        setNewProduct({
            name: '',
            quantity: 0,
            price: 0,
            image: '',
            supplier: '',
            category: '',
            rating: 0.0,
            description: ''
        });
        
        closeDeleteProductDialog();
    }

    const toggleLoading = (isLoading) => {
        if (isLoading) {
            document.getElementById('loading').style.display = 'block';
        } else {
            document.getElementById('loading').style.display = 'none';
        }
    };

    const formContent = () => {

        return (
            <DialogContent>
                <TextField
                    label="Product Name"
                    name="name"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    fullWidth
                    margin="normal"
                    required
                    color='success'
                    size='small'
                />

                <Box sx={{ display: 'flex', justifyContent: 'space-evenly', gap: '10px' }}>
                    <TextField
                        label="Quantity"
                        name="quantity"
                        type="number"
                        value={newProduct.quantity}
                        onChange={(e) => setNewProduct({ ...newProduct, quantity: parseInt(e.target.value) })}
                        fullWidth
                        margin="normal"
                        required
                        color='success'
                        size='small'
                    />
                    <FormControl sx={{ mt: 1, minWidth: 160, alignSelf: 'center' }} size="small">
                        <InputLabel id="category-label" color='success'>Category</InputLabel>

                        <Select
                            name="category"
                            value={newProduct.category}
                            label="Category"
                            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                            required
                            color='success'
                            fullWidth

                        >
                            <MenuItem value={'Fresh Produce'}>Fresh Produce</MenuItem>
                            <MenuItem value={'Dairy and Eggs'}>Dairy and Eggs</MenuItem>
                            <MenuItem value={'Bakery'}>Bakery</MenuItem>
                            <MenuItem value={'Meat and Seafood'}>Meat and Seafood</MenuItem>
                            <MenuItem value={'Frozen Foods'}>Frozen Foods</MenuItem>
                            <MenuItem value={'Canned Goods'}>Canned Goods</MenuItem>
                            <MenuItem value={'Pasta and Grains'}>Pasta and Grains</MenuItem>
                            <MenuItem value={'Condiments'}>Condiments</MenuItem>
                            <MenuItem value={'Snacks'}>Snacks</MenuItem>
                            <MenuItem value={'Beverages'}>Beverages</MenuItem>
                            <MenuItem value={'Household and Cleaning'}>Household and Cleaning</MenuItem>
                            <MenuItem value={'Personal Care'}>Personal Care</MenuItem>
                            <MenuItem value={'Baby and Kids'}>Baby and Kids</MenuItem>
                            <MenuItem value={'Pet Supplies'}>Pet Supplies</MenuItem>
                            <MenuItem value={'Health and Wellness'}>Health and Wellness</MenuItem>
                            <MenuItem value={'Electronics'}>Electronics</MenuItem>

                        </Select>
                    </FormControl>
                </Box>

                <TextField
                    label="Supplier"
                    name="supplier"
                    value={newProduct.supplier}
                    onChange={(e) => setNewProduct({ ...newProduct, supplier: e.target.value })}
                    fullWidth
                    margin="normal"
                    required
                    color='success'
                    size='small'
                />

                <Box sx={{ display: 'flex', justifyContent: 'space-evenly', gap: '10px' }}>
                    <TextField
                        label="Price Rs."
                        name="price"
                        type="number"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({ ...newProduct, price: parseInt(e.target.value) })}
                        fullWidth
                        margin="normal"
                        required
                        color='success'
                        size='small'
                    />
                    <TextField
                        label="Rating"
                        name="rating"
                        fullWidth
                        type='number'
                        value={newProduct.rating}
                        onChange={(e) => setNewProduct({ ...newProduct, rating: parseFloat(e.target.value) })}
                        size='small'
                        margin="normal"
                        required
                        color='success'
                    />
                </Box>

                <TextField
                    label="Description"
                    name="description"
                    color='success'

                    value={newProduct.description}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                    fullWidth
                    margin="normal"
                    required
                />

                <div className="image-upload">

                    <img
                        src={newProduct.newImage ? window.URL.createObjectURL(newProduct.newImage) : ''}
                        alt="Selected Image"
                        id="product-image"
                        style={{
                            maxHeight: '200px',
                            maxWidth: '200px',
                            margin: '10px 0px',
                            display: newProduct.newImage ? 'block' : 'none'
                        }}
                    />
                    <img
                        src={newProduct.image}
                        alt="Selected Image"
                        id="product-image"
                        style={{
                            maxHeight: '200px',
                            maxWidth: '200px',
                            margin: '10px 0px',
                            display: newProduct.image && !newProduct.newImage ? 'block' : 'none'
                        }}
                    />
                    <br />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setNewProduct({ ...newProduct, newImage: e.target.files[0] })}
                        id="image-upload"
                        style={{ display: 'none' }}
                    />
                    <label htmlFor="image-upload" style={{
                        backgroundColor: '#3bb77e',
                        color: 'white',
                        padding: '10px 5px',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        margin: '20px 0px'
                    }}>
                        Upload Image
                    </label>
                </div>

            </DialogContent>
        );
    }

    return (
        <>
            <Header />
            <div className="inventory-container">
                <h2>Inventory</h2>
                <div className="search-field">
                    <TextField
                        label="Search Product..."
                        variant="outlined"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        sx={{ marginBottom: '20px' }}
                        size="small"
                        fullWidth
                        color="success"
                    />
                    <Button
                        variant="contained"
                        color="success"
                        sx={{ backgroundColor: "#3bb77e", height: '35px', width: "190px" }}
                        onClick={openAddProductDialog}
                    >
                        <Typography noWrap>Add Product</Typography>
                    </Button>
                </div>
                <Paper elevation={2} sx={{ overflow: 'hidden' }}>
                    <TableContainer sx={{ maxHeight: 1000 }}>
                        <Table stickyHeader aria-label="inventory table">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{ minWidth: column.minWidth }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {filteredInventory.map((row) => (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.id === 'price' ? `Rs.${value}` :
                                                        column.id === 'image' ? (
                                                            <img src={value} alt={value} style={{ height: '35px', width: 'auto' }} />
                                                        ) : column.id === 'edit' ? (
                                                            <>
                                                            <IconButton aria-label="edit" onClick={() => openEditProductDialog(row)} >
                                                                <EditIcon />
                                                            </IconButton>
                                                            <IconButton aria-label="delete" onClick={() => openDeleteProductDialog(row)} color="error">
                                                                <DeleteIcon />
                                                            </IconButton>
                                                            
                                                            </>
                                                        ) : (
                                                            value
                                                        )}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
                <Dialog open={isAddProductOpen} onClose={closeAddProductDialog}>
                    <form onSubmit={handleAddProduct}>
                        <DialogTitle sx={{ textAlign: 'center' }} >Add Product</DialogTitle>
                        
                        {formContent()}
                        
                        <DialogActions>
                            <CircularProgress size={30} id='loading' sx={{ display: 'none' }} />
                            <Button onClick={closeAddProductDialog} color="error">
                                Cancel
                            </Button>
                            <Button type="submit" color="success"  >
                                Add
                            </Button>

                        </DialogActions>
                    </form>
                </Dialog>
                <Dialog open={isEditProductOpen} onClose={closeEditProductDialog} >
                    <DialogTitle sx={{ textAlign: 'center' }}>Edit Product</DialogTitle>
            
                    {formContent()}

                    <DialogActions >
                    <CircularProgress size={30} id='loading' sx={{ display: 'none' }} color='success' />
                        <Button onClick={closeEditProductDialog} color="error">
                            Cancel
                        </Button>
                        <Button onClick={handleUpdate} color="success">
                            Confirm
                        </Button>
                    </DialogActions>
                </Dialog>
                
                <Dialog open={isDeleteProductOpen} onClose={closeDeleteProductDialog} >
                <DialogTitle>Are you sure?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Do you want to delete this product?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                <CircularProgress size={30} id='loading' sx={{ display: 'none' }} color='success'/>
                    <Button onClick={closeDeleteProductDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDelete} color="error" >
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>


            </div>
            <Footer />
        </>
    );
}
