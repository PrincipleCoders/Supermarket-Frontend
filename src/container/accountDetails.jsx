import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import '../styles/AccountDetails.css';

const AccountDetails = (props) => {
    const [fname, setfName] = useState(props.fname);
    const [lname, setlName] = useState(props.lname);
    const [address, setAddress] = useState(props.address);
    const [email, setEmail] = useState(props.email);
    const [telephone, setTelephone] = useState(props.telephone);

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsDialogOpen(true);
    };

    const handleConfirm = () => {
        // Handle changes here and close the dialog
        console.log('Confirmed changes');
        setIsDialogOpen(false);
        console.log('First Name:', fname);
        console.log('Last Name:', lname);
        console.log('Email Address:', email);
        console.log('Shipping Address:', address);
        console.log('Telephone', telephone);

    };

    const handleCancel = () => {
        // Cancel changes and close the dialog
        console.log('Canceled changes');
        setIsDialogOpen(false);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2 className='ac-details-headding'>Account Details</h2>
                <div className="account-details">
                    <div className="profile-name">
                        <TextField
                            id="fname"
                            label="First Name"
                            defaultValue={fname}
                            onChange={(e) => setfName(e.target.value)}
                            color='success'
                        />
                        <TextField
                            id="lname"
                            label="Last Name"
                            defaultValue={lname}
                            onChange={(e) => setlName(e.target.value)}
                            color='success'
                        />
                    </div>
                    <TextField
                        id="email"
                        type='email'
                        label="Email Address"
                        defaultValue={email}
                        onChange={(e) => setEmail(e.target.value)}
                        color='success'
                        disabled
                    />
                    <TextField
                        id="tp"
                        type='tel'
                        label="Telephone Number"
                        defaultValue={telephone}
                        onChange={(e) => setTelephone(e.target.value)}
                        color='success'
                    />
                    <TextField
                        id="address"
                        label="Shipping Address"
                        defaultValue={address}
                        onChange={(e) => setAddress(e.target.value)}
                        color='success'
                    />
                    <Button type="submit" variant='contained' color='success' sx={{ backgroundColor: "#3bb77e", width: '150px' }}>Save Changes</Button>
                </div>
            </form>

            <Dialog open={isDialogOpen} onClose={handleCancel}>
                <DialogTitle>Confirm Changes</DialogTitle>
                <DialogContent>
                    <DialogContentText>Are you sure you want to save the changes?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel} color="success">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirm} color="success" variant='contained'>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AccountDetails;
