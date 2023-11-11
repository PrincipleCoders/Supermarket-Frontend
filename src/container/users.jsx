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
import { FormControl, Select, MenuItem } from '@mui/material';
import '../styles/inventory.css';
import GetAllUsers from '../services/getAllUsers.jsx';
import UpdateUserRole from '../services/updateUserRole.jsx';

import Header from '../components/header.jsx';
import Footer from '../components/footer.jsx';


export default function Users({ showAlert }) {
    const [searchTerm, setSearchTerm] = useState('');


    //   const [allUsers, setAllUsers] = useState([
    //     { "id": "1002", "firstName": "John", "lastName": "Doe", "email": "john.doe@example.com", "telephone": "0712345678", "address": "Colombo, Sri Lanka", "userRole": "ADMIN" },
    //     { "id": "1003", "firstName": "Jane", "lastName": "Smith", "email": "jane.smith@example.com", "telephone": "0723456789", "address": "Kandy, Sri Lanka", "userRole": "DELIVERY" },
    //     // ... (your other user data)
    //   ]);

    const [allUsers, setAllUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const users = await GetAllUsers();
            if (users) {
                // Update local state or perform other actions with the users
                setAllUsers(users);
                console.log('Fetched Users:', users);
            }
        };

        fetchUsers();
    }, []);

    const handleUpdateUserRole = async (userId, newRole) => {
        const updatedUser = await UpdateUserRole(userId, newRole);
        if (updatedUser) {
          console.log('User role updated:', updatedUser);
          // Update local state or perform other actions
        }
      };

    const columns = [
        { id: 'id', label: 'ID', minWidth: 50, align: 'center' },
        { id: 'firstName', label: 'First Name', minWidth: 100, align: 'center' },
        { id: 'lastName', label: 'Last Name', minWidth: 100, align: 'left' },
        { id: 'email', label: 'Email', minWidth: 100, align: 'left' },
        { id: 'telephone', label: 'Telephone', minWidth: 100, align: 'center' },
        { id: 'address', label: 'Address', minWidth: 100, align: 'left' },
        { id: 'userRole', label: 'User Role', minWidth: 100, align: 'center' },
    ];

    const filteredUsers = allUsers.filter(
        (user) =>
            user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.lastName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const [selectedUserId, setSelectedUserId] = useState('');
    const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
    const [userRole, setUserRole] = useState('');

    const openConfirmation = () => {
        setOpenConfirmationDialog(true);
    };

    const closeConfirmationDialog = () => {
        setOpenConfirmationDialog(false);
        setSelectedUserId('');
    };

    const handleChange = (event, userId) => {
        setUserRole(event.target.value);
        setSelectedUserId(userId);
        openConfirmation()
    };

    const handleConfirmation = (confirm) => {
        if (confirm) {
            handleUpdateUserRole(selectedUserId,userRole);
            const updatedUsers = allUsers.map((user) =>
                user.id === selectedUserId ? { ...user, userRole: userRole } : user
            );
            setAllUsers(updatedUsers);
        }
        closeConfirmationDialog();
    };

    return (
        <>
            <Header />
            <div className="inventory-container">
                <h2>All Users</h2>
                <div className="search-field">
                    <TextField
                        label="Search Users.."
                        variant="outlined"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        sx={{ marginBottom: '20px' }}
                        size="small"
                        fullWidth
                        color="success"
                    />
                </div>
                <Paper elevation={2} sx={{ overflow: 'hidden' }}>
                    <TableContainer sx={{ maxHeight: 1000 }}>
                        <Table stickyHeader aria-label="users table">
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
                                {filteredUsers.map((row) => (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.id === 'userRole' ? (
                                                        <FormControl fullWidth size="small">
                                                            <Select
                                                                id="user-Role-select"
                                                                value={value}
                                                                onChange={(event) => handleChange(event, row.id)}
                                                                color="success"
                                                            >
                                                                <MenuItem value={'CUSTOMER'}>CUSTOMER</MenuItem>
                                                                <MenuItem value={'ADMIN'}>ADMIN</MenuItem>
                                                                <MenuItem value={'DELIVERY'}>DELIVERY</MenuItem>
                                                            </Select>
                                                        </FormControl>
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
                <Dialog open={openConfirmationDialog} onClose={closeConfirmationDialog}>
                    <DialogTitle>Confirm User Role Change</DialogTitle>
                    <DialogContent>
                        <Typography>
                            Are you sure you want to change the user role?
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => handleConfirmation(false)} color="error">
                            Cancel
                        </Button>
                        <Button onClick={() => handleConfirmation(true)} color="success">
                            Confirm
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
            <Footer />
        </>
    );
}
