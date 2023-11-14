import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import GetUserOrders from '../services/allUserOrders';
import { useState, useEffect } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import DateTime from '../components/dateTime'
import GetOrderItems from '../services/getOrderItems'
import { CircularProgress } from '@mui/material';
import Button from '@mui/material/Button';


// const orders = [
//     { id: '4567', date: '04-05-2023', status: 'processing', total: 2550, items: 4 },
//     { id: '7890', date: '04-06-2023', status: 'delivered', total: 720, items: 2 },
//     { id: '1234', date: '04-07-2023', status: 'ready to delivery', total: 1420, items: 3 },
//     { id: '5678', date: '04-08-2023', status: 'on the way', total: 980, items: 1 },
//     { id: '2345', date: '04-09-2023', status: 'processing', total: 3350, items: 6 },
//     { id: '6789', date: '04-10-2023', status: 'delivered', total: 1140, items: 3 },
//     { id: '3456', date: '04-11-2023', status: 'ready to delivery', total: 2180, items: 4 },
//     { id: '7891', date: '04-12-2023', status: 'on the way', total: 1425, items: 2 },
//     { id: '4569', date: '04-13-2023', status: 'processing', total: 1590, items: 3 },
//     { id: '1236', date: '04-14-2023', status: 'delivered', total: 660, items: 1 },
//     { id: '3459', date: '04-15-2023', status: 'ready to delivery', total: 1980, items: 4 },
//     { id: '2348', date: '04-16-2023', status: 'on the way', total: 1170, items: 2 },
//     { id: '5670', date: '04-17-2023', status: 'processing', total: 4300, items: 8 },
//     { id: '7893', date: '04-18-2023', status: 'delivered', total: 1230, items: 3 },
//     { id: '4562', date: '04-19-2023', status: 'ready to delivery', total: 2780, items: 5 },
// ];


export default function Orders() {

    const userId = JSON.parse(localStorage.getItem('user')).id;

    // const orders = GetUserOrders();
    const [orders, setOrders] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [selectedItems, setSelectedItems] = useState([]);

    useEffect(() => {
        const fetchUserOrders = async () => {
            const orderList = await GetUserOrders(userId);
            if (orderList) {
                setOrders(orderList);
            }
        };
        fetchUserOrders();

    }, []);

    const columns = [
        { id: 'id', label: 'Order', minWidth: 100, align: 'center', },
        { id: 'date', label: 'Date', minWidth: 170, align: 'center', },
        { id: 'time', label: 'Time', minWidth: 170, align: 'center', },
        {
            id: 'status',
            label: 'Status',
            minWidth: 100,
        },
        {
            id: 'items',
            label: 'Items',
            minWidth: 150,
            align: 'center',
        },
        {
            id: 'total',
            label: 'Total',
            minWidth: 170,
        },

    ];

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'processing':
                return 'red';
            case 'delivered':
                return 'green';
            case 'ready to delivery':
                return 'orange';
            case 'on the way':
                return 'blue';
            default:
                return 'black';
        }
    };

    const fetchItems = async (orderId) => {
        toggleLoading(true);
        const result = await GetOrderItems(userId,orderId);
        if (result) {
           setSelectedItems(result);
           console.log('selectedItems :',result)
        }
        toggleLoading(false);  
        console.log(newProduct);
    };

    const handleClickRow = (row) => {
        setSelectedOrder(row);
        setDialogOpen(true);
        fetchItems(row.id);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
        setSelectedOrder(null);
        setSelectedItems([]);
    };

    const toggleLoading = (isLoading) => {
        if (isLoading) {
            document.getElementById('loading').style.display = 'block';
        } else {
            document.getElementById('loading').style.display = 'none';
        }
    };



    return (
        <>
            <div style={{ margin: "0px 50px" }}>
                <Header />

                <h2>Your Orders</h2>
                <Paper elevation={2} sx={{ width: '100%', overflow: 'hidden' }}>
                    <TableContainer sx={{ maxHeight: 440 }}>
                        <Table stickyHeader aria-label="order table">
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
                                {orders
                                    .map((row) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.code} onClick={() => handleClickRow(row)}>
                                                {columns.map((column) => {
                                                    const value = row[column.id];
                                                    const cellColor = column.id === 'status' ? getStatusColor(value) : 'inherit';
                                                    return (
                                                        <TableCell key={column.id} align={column.align} style={{ color: cellColor }}>
                                                            {column.id === 'id' ? `#${value}` :
                                                                column.id === 'total' ? `Rs.${value}` :
                                                                    column.id === 'date' ? DateTime(value)[0] :
                                                                        column.id === 'time' ? DateTime(row.date)[1] :
                                                                            column.id === 'items' ? `${value.length} items` :
                                                                                value}
                                                        </TableCell>
                                                    );
                                                })}
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    </TableContainer>

                </Paper>

                <Dialog open={dialogOpen} onClose={handleCloseDialog}>
                    <DialogTitle>Order Details</DialogTitle>
                    <DialogContent>

                        {selectedOrder && (
                            <div style={{ display: "flex", flexDirection: 'column', gap: 5 }}>
                                {/* Add order details here */}
                                <Typography><b>Order ID: </b>{selectedOrder.id}</Typography>
                                <Typography><b>Status : </b>
                                    <span style={{ color: getStatusColor(selectedOrder.status) }}>
                                        {selectedOrder.status}
                                    </span>
                                </Typography>
                              <b>Items: </b>
                              <CircularProgress size={30} id='loading' sx={{ display: 'none' }} color='success' />
                                <ul>
                                    {selectedOrder.items.map((item, index) => (
                                        <li key={index}>{item.item} - {item.quantity}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button color='success' onClick={handleCloseDialog} variant='contained'>
                            Ok
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
            <Footer />
        </>
    );
}
