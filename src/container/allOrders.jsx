import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import GetUserOrders from '../services/allUserOrders.jsx'
import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { useAlert } from '../components/AlertContext.jsx';
import { CircularProgress } from '@mui/material';





export default function AllOrders() {

    const showAlert = useAlert();
    
    // const allOrders = [
    //     {
    //         id: '4567',
    //         date: '04-05-2023',
    //         status: 'processing',
    //         total: 2550,
    //         items: 4,
    //         telephone: '123-456-7890',
    //         customer: 'John Doe',
    //         address: '123 Main St, Springfield'
    //     },
    //     {
    //         id: '7890',
    //         date: '04-06-2023',
    //         status: 'delivered',
    //         total: 720,
    //         items: 2,
    //         telephone: '987-654-3210',
    //         customer: 'Jane Smith',
    //         address: '456 Elm St, Springfield'
    //     },
    //     {
    //         id: '1234',
    //         date: '04-07-2023',
    //         status: 'ready to delivery',
    //         total: 1420,
    //         items: 3,
    //         telephone: '555-123-4567',
    //         customer: 'Alice Johnson',
    //         address: '789 Oak St, Springfield'
    //     },
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

    const [allOrders, setAllOrders] = useState([]);
    const isEmpty = (allOrders == []) ? true : false ;

  useEffect(() => {
    toggleLoading(true);
    const fetchAllOrders = async () => {
      const orders = await GetUserOrders();
      if (orders) {
        setAllOrders(orders);
        console.log('All Orders:', orders);
      }
    };

    fetchAllOrders().finally(() => toggleLoading(false));
  }, []);
    
    const columns = [
        { id: 'id', label: 'Order', minWidth: 100, align: 'center', },
        { id: 'date', label: 'Date', minWidth: 170, align: 'center', },
        { id: 'customer', label: 'Customer', minWidth: 170, align: 'left', },
        { id: 'address', label: 'Address', minWidth: 170, align: 'left', },
        { id: 'telephone', label: 'Contact No.', minWidth: 170, align: 'center', },
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
        {
            id: 'status',
            label: 'Status',
            minWidth: 100,
        },
    
    ];

    const getStatusColor = (status) => {
        switch ((status || '').toLowerCase()) {
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

    const toggleLoading = (isLoading) => {
        if (isLoading) {
            document.getElementById('loading').style.display = 'block';
        } else {
            document.getElementById('loading').style.display = 'none';
        }
    }

    

    return (
        <>
            <Header/>
            
            <div style={{ margin: "0px 10px" }}>
                

                <h2>All Orders</h2>
                <CircularProgress style={{ display: 'none', margin:'15px auto' }} id='loading'/>
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
                                {allOrders
                                    .map((row) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                                {columns.map((column) => {
                                                    const value = row[column.id];
                                                    const cellColor = column.id === 'status' ? getStatusColor(value) : 'inherit';
                                                    return (
                                                        <TableCell key={column.id} align={column.align} style={{ color: cellColor }}>
                                                            {column.id === 'id' ? `#${value}` : column.id === 'total' ? `Rs.${value}` : value}
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
            </div>
            <Footer/>
        </>
    );
}
