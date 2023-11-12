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
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import '../styles/inventory.css';

import AllProducts from '../services/allProducts';
import AddNewProduct from '../services/addNewProduct';
import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";
import UpdateProductQuantity from '../services/updateIQuantity.jsx';

export default function Inventory({ showAlert }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [isAddProductOpen, setIsAddProductOpen] = useState(false);
    const [isEditProductOpen, setIsEditProductOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [quantityToUpdate, setQuantityToUpdate] = useState(0);

    useEffect(() => {
      if(quantityToUpdate < 0){
        setQuantityToUpdate(0);
      }
    }, [quantityToUpdate])
    


    const [newProduct, setNewProduct] = useState({
        name: '',
        quantity: 0,
        price: 0,
        image: '',
        supplier: '',
        category: '',
        rating: 0.0,
    });
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

    useEffect(() => {
        const fetchInventoryItems = async () => {
            const allItems = await AllProducts();
            if (allItems) {
                setInventory(allItems);
            }
        };

        fetchInventoryItems();
    }, []);

    const openEditProductDialog = (product) => {
        setIsEditProductOpen(true);
        setSelectedProduct(product);
        setQuantityToUpdate(product.quantity);
    };

    const closeEditProductDialog = () => {
        setIsEditProductOpen(false);
        setSelectedProduct(null);
        setQuantityToUpdate(0);
    };

    const handleQuantityChange = (event) => {
        setQuantityToUpdate(parseInt(event.target.value) || 0);
    };

    const updateProductQuantity = () => {
        const updatedInventory = inventory.map((product) => {
            if (product.id === selectedProduct.id) {
                UpdateProductQuantity(selectedProduct.id,quantityToUpdate)
                return { ...product, quantity: quantityToUpdate };
            }
            return product;
        });
        setInventory(updatedInventory);
        closeEditProductDialog();
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
        { id: 'edit', label: 'Update Quantity', minWidth: 50, align: 'center' },
    ];

    const filteredInventory = inventory.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const openAddProductDialog = () => {
        setIsAddProductOpen(true);
    };

    const closeAddProductDialog = () => {
        setIsAddProductOpen(false);
    };

    const handleAddProduct = async (event) => {
        event.preventDefault();
        // Add the new product to the inventory
        const result = await AddNewProduct(newProduct);
        // If addition is successful, you might want to update the UI or take additional actions
        if (result) {
            console.log('Item added:', result);
            // Update local state or perform other actions
        }
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
        });

        console.log(inventory);
        console.log(newProduct);
    };

    const handleUpdate = async (productId, newQuantity) => {
        const result = await UpdateProductQuantity(productId, newQuantity); 
        if (result) {
          console.log('Product quantity updated:', result);
        }
      };

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
                                                            <img src={`/src/assets/categoryh1.png`} alt={value} style={{ height: '35px', width: 'auto' }} />
                                                        ) : column.id === 'edit' ? (
                                                            <Button onClick={() => openEditProductDialog(row)} color="primary">
                                                                Update
                                                            </Button>
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
                        <DialogTitle>Add Product</DialogTitle>
                        <DialogContent>
                            <TextField
                                label="Product Name"
                                name="name"
                                value={newProduct.name}
                                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                                fullWidth
                                margin="normal"
                                required
                            />
                            <TextField
                                label="Quantity"
                                name="quantity"
                                type="number"
                                value={newProduct.quantity}
                                onChange={(e) => setNewProduct({ ...newProduct, quantity: parseInt(e.target.value) })}
                                fullWidth
                                margin="normal"
                                required
                            />
                            <TextField
                                label="category"
                                name="category"

                                value={newProduct.category}
                                onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                                fullWidth
                                margin="normal"
                                required
                            />
                            <TextField
                                label="Price"
                                name="price"
                                type="number"
                                value={newProduct.price}
                                onChange={(e) => setNewProduct({ ...newProduct, price: parseInt(e.target.value) })}
                                fullWidth
                                margin="normal"
                                required
                            />
                            <TextField
                                label="Rating"
                                name="rating"
                                fullWidth
                                type='number'
                                value={newProduct.rating}
                                onChange={(e) => setNewProduct({ ...newProduct, rating: parseFloat(e.target.value) })}

                                margin="normal"
                                required
                            />

                            <TextField
                                label="Supplier"
                                name="supplier"
                                value={newProduct.supplier}
                                onChange={(e) => setNewProduct({ ...newProduct, supplier: e.target.value })}
                                fullWidth
                                margin="normal"
                                required
                            />
                            <br />
                            <br />

                            <div className="image-upload">

                                <img
                                    src={newProduct.image ? URL.createObjectURL(newProduct.image) : ''}
                                    alt="Selected Image"
                                    id="product-image"
                                    style={{
                                        maxHeight: '200px',
                                        maxWidth: '200px',
                                        margin: '10px 0px',
                                        display: newProduct.image ? 'block' : 'none'
                                    }}
                                />
                                <br />
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setNewProduct({ ...newProduct, image: e.target.files[0] })}
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
                        <DialogActions>
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
                    <DialogTitle sx={{ backgroundColor: '#fffff', textAlign:'center',width:'350px'}} >Update Product Quantity</DialogTitle>
                    <Divider/>
                    <DialogContent>
                        <Typography variant="subtitle1" sx={{ marginBottom: '10px' ,mt:'25px'}}>
                            <div className='product-sub-titile'> <b>Product:</b> {selectedProduct?.name}</div>
                        </Typography>
                        
                        <Typography variant="subtitle1" sx={{ marginBottom: '25px' }}>
                            <div className='product-sub-titile'>  <span><b>Current Quantity:</b></span>   {selectedProduct?.quantity}</div>
                        </Typography>
                        <TextField
                            label="New Quantity"
                            type="number"
                            value={quantityToUpdate}
                            onChange={handleQuantityChange}
                            fullWidth
                            margin="normal"
                            sx={{ marginBottom: '20px' }}
                            color='success'
                        />
                    </DialogContent>
                    <DialogActions sx={{p:'0px 24px 15px 24px',justifyContent:'space-between'}}>
                        <Button onClick={closeEditProductDialog} color="error">
                            Cancel
                        </Button>
                        <Button onClick={updateProductQuantity}  sx={{ backgroundColor: '#3bb77e', color: 'white' }} color="success" variant="contained">
                            Update Quantity
                        </Button>
                    </DialogActions>
                </Dialog>

            </div>
            <Footer />
        </>
    );
}
