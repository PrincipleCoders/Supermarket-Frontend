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
import { FormControl, Select, MenuItem, CircularProgress } from '@mui/material';
import '../styles/inventory.css';
import GetAllUsers from '../services/getAllUsers.jsx';
import UpdateUserRole from '../services/updateUserRole.jsx';
import { useAlert } from '../components/AlertContext.jsx';
import Header from '../components/header.jsx';
import Footer from '../components/footer.jsx';


export default function Users() {
    const showAlert = useAlert();
    const [searchTerm, setSearchTerm] = useState('');


    //   const [allUsers, setAllUsers] = useState([
    //     { "id": "1002", "firstName": "John", "lastName": "Doe", "email": "john.doe@example.com", "telephone": "0712345678", "address": "Colombo, Sri Lanka", "role": "ADMIN" },
    //     { "id": "1003", "firstName": "Jane", "lastName": "Smith", "email": "jane.smith@example.com", "telephone": "0723456789", "address": "Kandy, Sri Lanka", "role": "DELIVERY" },
    //     // ... (your other user data)
    //   ]);

    const [allUsers, setAllUsers] = useState([]);

    const fetchUsers = async () => {
        const users = await GetAllUsers();
        if (users) {
            // Update local state or perform other actions with the users
            setAllUsers(users);
            console.log('Fetched Users:', users);
        }
    };

    useEffect(() => {
        toggleLoading(true);
        fetchUsers().finally(() => toggleLoading(false));
    }, []);

    const handleUpdateRole = async (userId, newRole) => {
        toggleLoading(true);
        const updatedUser = await UpdateUserRole(userId, newRole);
        if (updatedUser) {
          console.log('User role updated:', updatedUser);
          // Update local state or perform other actions
          showAlert('User role updated successfully', 'success');
        }
        else {
          showAlert('Error updating user role', 'error');
        }
        toggleLoading(false);
        fetchUsers();
      };

    const columns = [
        { id: 'id', label: 'ID', minWidth: 50, align: 'center' },
        { id: 'name', label: 'Name', minWidth: 100, align: 'center' },
        { id: 'email', label: 'Email', minWidth: 100, align: 'left' },
        { id: 'telephone', label: 'Telephone', minWidth: 100, align: 'center' },
        { id: 'address', label: 'Address', minWidth: 100, align: 'left' },
        { id: 'role', label: 'User Role', minWidth: 100, align: 'center' }
    ];

    const filteredUsers = allUsers.filter(
        (user) =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const [selectedUserId, setSelectedUserId] = useState('');
    const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
    const [role, setRole] = useState('');

    const openConfirmation = () => {
        setOpenConfirmationDialog(true);
    };

    const closeConfirmationDialog = () => {
        setOpenConfirmationDialog(false);
        setSelectedUserId('');
    };

    const handleChange = (event, userId) => {
        setRole(event.target.value);
        setSelectedUserId(userId);
        openConfirmation()
    };

    const handleConfirmation = (confirm) => {
        if (confirm) {
            handleUpdateRole(selectedUserId,role);
        }
        closeConfirmationDialog();
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
            <Header />
            <div className="inventory-container">
                <h2>All Users</h2>
                <CircularProgress id='loading' sx={{ display: 'none', margin: '15px auto' }} />
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
                                                    {column.id === 'role' ? (
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
