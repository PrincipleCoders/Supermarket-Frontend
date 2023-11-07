import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

export default function ToDeliver() {
    const [remainingOrders, setRemainingOrders] = useState([
        {
            id: 2004,
            customer: 'J. Smith',
            address: '123 Main St, Springfield',
            items: [
              { item: 'Chips', quantity: 3 },
              { item: 'Ice Cream', quantity: 2 },
            ],
            bill: 850,
            markToDeliver: true,
            isDelivered: false,
          },
          {
            id: 2005,
            customer: 'A. Johnson',
            address: '456 Elm St, Springfield',
            items: [
              { item: 'Pizza', quantity: 1 },
              { item: 'Milk', quantity: 4 },
            ],
            bill: 420,
            markToDeliver: true,
            isDelivered: false,
          },
          {
            id: 2006,
            customer: 'S. Brown',
            address: '789 Oak St, Springfield',
            items: [
              { item: 'Burger', quantity: 2 },
              { item: 'Coke 1L', quantity: 3 },
              { item: 'Ice Cream', quantity: 1 },
            ],
            bill: 1120,
            markToDeliver: false,
            isDelivered: false,
          },
          {
            id: 2007,
            customer: 'L. Davis',
            address: '101 Pine St, Springfield',
            items: [
              { item: 'Chips', quantity: 4 },
            ],
            bill: 300,
            markToDeliver: true,
            isDelivered: false,
          },
          {
            id: 2008,
            customer: 'E. Wilson',
            address: '202 Cedar St, Springfield',
            items: [
              { item: 'Coke 1L', quantity: 1 },
              { item: 'Burger', quantity: 2 },
              { item: 'Ice Cream', quantity: 3 },
            ],
            bill: 970,
            markToDeliver: false,
            isDelivered: false,
          },
          {
            id: 2009,
            customer: 'K. Taylor',
            address: '303 Maple St, Springfield',
            items: [
              { item: 'Milk', quantity: 2 },
              { item: 'Toothpaste', quantity: 1 },
            ],
            bill: 150,
            markToDeliver: true,
            isDelivered: false,
          },
          {
            id: 2010,
            customer: 'R. Harris',
            address: '404 Birch St, Springfield',
            items: [
              { item: 'Chips', quantity: 3 },
              { item: 'Pizza', quantity: 2 },
              { item: 'Bananas', quantity: 5 },
            ],
            bill: 750,
            markToDeliver: false,
            isDelivered: false,
          },
          {
            id: 2011,
            customer: 'D. Martinez',
            address: '505 Walnut St, Springfield',
            items: [
              { item: 'Apples', quantity: 4 },
              { item: 'Bananas', quantity: 3 },
            ],
            bill: 400,
            markToDeliver: true,
            isDelivered: false,
          },
        ]);

    const [isConfirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
    const [isConfirmationDialogOpenDeliver, setConfirmationDialogOpenDeliver] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [deliveredStatus, setDeliveredStatus] = useState(false);

    const columns = [
        { id: 'id', label: 'ID', minWidth: 25, align: 'center' },
        { id: 'customer', label: 'Customer', minWidth: 50, align: 'left' },
        { id: 'address', label: 'Address', minWidth: 75, align: 'left' },
        { id: 'items', label: 'Items', minWidth: 100, align: 'left' },
        { id: 'bill', label: 'Bill', minWidth: 50, align: 'left' },
        { id: 'markToDeliver', label: 'Mark as taken', minWidth: 20, align: 'center' },
        { id: 'isDelivered', label: 'Delivered', minWidth: 20, align: 'center' },
    ];

    const openConfirmationDialog = (orderId) => {
        setConfirmationDialogOpen(true);
        setSelectedOrderId(orderId);
    };

    const closeConfirmationDialog = () => {
        setConfirmationDialogOpen(false);
        setSelectedOrderId(null);
    };

    const openConfirmationDialogDeliver = (orderId) => {
        setConfirmationDialogOpenDeliver(true);
        setSelectedOrderId(orderId);
    };

    const closeConfirmationDialogDeliver= () => {
        setConfirmationDialogOpenDeliver(false);
        setSelectedOrderId(null);
    };

    const markAsTaken = () => {
        // Find the order by selectedOrderId and update its markToDeliver status
        const updatedOrders = remainingOrders.map((order) => {
            if (order.id === selectedOrderId && order.markToDeliver == true) {
                return { ...order, markToDeliver: false };
            } else if (order.id === selectedOrderId && order.markToDeliver == false) {
                return { ...order, markToDeliver: true };
            } else {
                return (order);
            }
        });

        setRemainingOrders(updatedOrders);
        closeConfirmationDialog();
        setSelectedOrderId(null);

        console.log(remainingOrders);

    };
    
    const markAsDelivered = () => {
        // Find the order by selectedOrderId and update its markToDeliver status
        const updatedOrders = remainingOrders.map((order) => {
            if (order.id === selectedOrderId && order.isDelivered == true) {
                return { ...order, isDelivered: false };
            } else if (order.id === selectedOrderId && order.isDelivered == false) {
                return { ...order, isDelivered: true };
            } else {
                return (order);
            }
        });

        setRemainingOrders(updatedOrders);
        closeConfirmationDialogDeliver();
        setSelectedOrderId(null);

        console.log(remainingOrders);

    };

    return (
        <div className="inventory-container">
            <h2>Orders to deliver</h2>

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
                                                ) : column.id === 'markToDeliver' ? (
                                                    <Checkbox
                                                        checked={row.markToDeliver}
                                                        onChange={() => openConfirmationDialog(row.id)}
                                                        color='success'
                                                        disabled={row.isDelivered}
                                                    />
                                                ) :  column.id === 'isDelivered' ? (
                                                    <Checkbox
                                                        checked={row.isDelivered}
                                                        onChange={() => openConfirmationDialogDeliver(row.id)}
                                                        color='success'
                                                        disabled={!row.markToDeliver}
                                                    />
                                                ): (
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
                    {remainingOrders.find((order) => order.id === selectedOrderId && order.markToDeliver) ? "Mark order as not taken" : "Mark order as taken"}
                </DialogTitle>
                <DialogContent>
                    <Typography>
                        Are you sure you want to mark this order as {remainingOrders.find((order) => order.id === selectedOrderId && order.markToDeliver) ? "not taken" : "taken"}?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeConfirmationDialog} sx={{ color: '#7e7e7e' }}>
                        Cancel
                    </Button>
                    <Button onClick={markAsTaken} color="success">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={isConfirmationDialogOpenDeliver} onClose={closeConfirmationDialogDeliver}>
                <DialogTitle>
                    {remainingOrders.find((order) => order.id === selectedOrderId && order.isDelivered) ? "Mark order as not taken" : "Mark order as taken"}
                </DialogTitle>
                <DialogContent>
                    <Typography>
                        Are you sure you want to mark this order as {remainingOrders.find((order) => order.id === selectedOrderId && order.isDelivered) ? "not taken" : "taken"}?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeConfirmationDialogDeliver} sx={{ color: '#7e7e7e' }}>
                        Cancel
                    </Button>
                    <Button onClick={markAsDelivered} color="success">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
