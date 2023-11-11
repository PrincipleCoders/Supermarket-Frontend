import React, { useState,useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import GetRemainingOrders from '../services/getRemainingOrders';
import UpdateRemainingOrders from '../services/updateRemainingOrders';

export default function RemainingOrders() {

    // const [remainingOrders, setRemainingOrders] = useState([
    //     {
    //         id: 1024,
    //         date: '2023-05-01',
    //         customer: 'P.K. Silva',
    //         items: [
    //             { item: 'Coke 1L', quantity: 2 },
    //             { item: 'Apples', quantity: 5 }
    //         ],
    //         isPacked: false
    //     },
    //     {
    //         id: 1025,
    //         date: '2023-05-02',
    //         customer: 'J. Smith',
    //         items: [
    //             { item: 'Chips', quantity: 3 },
    //             { item: 'Ice Cream', quantity: 2 }
    //         ],
    //         isPacked: false
    //     },
    //     {
    //         id: 1026, date: '2023-05-03', customer: 'A. Johnson', items: [
    //             { item: 'Pizza', quantity: 1 },
    //             { item: 'Milk', quantity: 4 }
    //         ],
    //         isPacked: false
    //     },
    //     {
    //         id: 1027, date: '2023-05-04', customer: 'S. Brown', items: [
    //             { item: 'Burger', quantity: 2 },
    //             { item: 'Coke 1L', quantity: 3 },
    //             { item: 'Ice Cream', quantity: 1 }
    //         ],
    //         isPacked: false
    //     },
    //     {
    //         id: 1028, date: '2023-05-05', customer: 'M. Lee', items: [
    //             { item: 'Chips', quantity: 4 }
    //         ],
    //         isPacked: false
    //     },
    //     {
    //         id: 1029, date: '2023-05-06', customer: 'L. Davis', items: [
    //             { item: 'Pizza', quantity: 2 },
    //             { item: 'Milk', quantity: 6 }
    //         ],
    //         isPacked: false
    //     },
    //     {
    //         id: 1030, date: '2023-05-07', customer: 'E. Wilson', items: [
    //             { item: 'Coke 1L', quantity: 1 },
    //             { item: 'Burger', quantity: 2 },
    //             { item: 'Ice Cream', quantity: 3 }
    //         ],
    //         isPacked: false
    //     },
    //     {
    //         id: 1031, date: '2023-05-08', customer: 'K. Taylor', items: [
    //             { item: 'Milk', quantity: 2 },
    //             { item: 'Toothpaste', quantity: 1 }
    //         ],
    //         isPacked: false
    //     },
    //     {
    //         id: 1032, date: '2023-05-09', customer: 'R. Harris', items: [
    //             { item: 'Chips', quantity: 3 },
    //             { item: 'Pizza', quantity: 2 },
    //             { item: 'Bananas', quantity: 5 }
    //         ],
    //         isPacked: false
    //     },
    //     {
    //         id: 1033, date: '2023-05-10', customer: 'D. Martinez', items: [
    //             { item: 'Apples', quantity: 4 },
    //             { item: 'Bananas', quantity: 3 }
    //         ],
    //         isPacked: false
    //     },
    // ]);

    const [remainingOrders, setRemainingOrders] = useState([]);

    useEffect(() => {
        const fetchRemainingOrders = async () => {
            const orders = await GetRemainingOrders();
            if (orders) {
                setRemainingOrders(orders);
            }
        };

        fetchRemainingOrders();
    }, []);

    const [isConfirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState(null);

    const columns = [
        { id: 'id', label: 'ID', minWidth: 50, align: 'center' },
        { id: 'date', label: 'Date', minWidth: 100, align: 'center' },
        { id: 'customer', label: 'Customer', minWidth: 100, align: 'left' },
        { id: 'items', label: 'Items', minWidth: 100, align: 'left' },
        { id: 'isPacked', label: 'Mark as Packed', minWidth: 100, align: 'center' },
    ];


    const openConfirmationDialog = (orderId) => {
        setConfirmationDialogOpen(true);
        setSelectedOrderId(orderId);
    };

    const closeConfirmationDialog = () => {
        setConfirmationDialogOpen(false);
        setSelectedOrderId(null);
    };

    const markAsPacked = () => {
        // Find the order by selectedOrderId and update its isPacked status
        const updatedOrders = remainingOrders.map(async(order) => {
            if (order.id === selectedOrderId && order.isPacked == true) {
                const result = await UpdateRemainingOrders(selectedOrderId, false);
                console.log(result);
                return { ...order, isPacked: false };

            } else if (order.id === selectedOrderId && order.isPacked == false) {
                const result = await UpdateRemainingOrders(selectedOrderId, true);
                console.log(result);
                return { ...order, isPacked: true };
            } else {
                console.log(result);
                return (order);
            }
        });


        setRemainingOrders(updatedOrders);
        closeConfirmationDialog();
        setSelectedOrderId(null);

        console.log(remainingOrders);

    };

    return (
        <div className="inventory-container">
            <h2>Remaining Orders</h2>

            <Paper elevation={2} sx={{ overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 500 }}>
                    <Table stickyHeader aria-label="orders table">
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
                            {remainingOrders.map((row) => (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                    {columns.map((column) => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                                {column.id === 'items' ? (
                                                    <ul style={{ padding: 0, margin: 0 }}>
                                                        {row.items.map((item, index) => (
                                                            <li key={index}>
                                                                {item.item} - {item.quantity}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                ) : column.id === 'isPacked' ? (
                                                    <Checkbox
                                                        checked={row.isPacked}
                                                        onChange={() => openConfirmationDialog(row.id)}
                                                        color='success'
                                                    />
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

            <Dialog open={isConfirmationDialogOpen} onClose={closeConfirmationDialog}>
                <DialogTitle>
                    {remainingOrders.find((order) => order.id === selectedOrderId && order.isPacked) ? "Mark order as ot packed" : "Mark order as packed"}
                </DialogTitle>
                <DialogContent>
                    <Typography>
                        Are you sure you want to mark this order as {remainingOrders.find((order) => order.id === selectedOrderId && order.isPacked) ? "not packed ?" : "packed ?"}?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeConfirmationDialog} sx={{ color: '#7e7e7e' }}>
                        Cancel
                    </Button>
                    <Button onClick={markAsPacked} color="success">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
