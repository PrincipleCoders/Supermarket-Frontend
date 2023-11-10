import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import '../styles/AccountDetails.css';
import GetUserInfo from '../services/getUserInfo';
import UpdateUserInfo from '../services/updateUserInfo';
import { useEffect } from 'react';

const AccountDetails = () => {

    // const userInfo = {
    //     Id:'1001',
    //     fname:'Harshana',
    //     lname:'Batagalla',
    //     address:'25, Kandy RD, Matale.', 
    //     telephone:'0710770569',
    //     email:'hbatagalla@gmail.com'
    // }

    // const userInfo = GetUserInfo();

    const [userInfo, setUserInfo] = useState([]);

    useEffect(() => {
        const fetchUserInfo = async () => {
            const Info = await GetUserInfo();
            if (Info) {
                setUserInfo(Info);
            }
        };

        fetchUserInfo();
    }, []);

    const [fname, setfName] = useState(userInfo.fname);
    const [lname, setlName] = useState(userInfo.lname);
    const [address, setAddress] = useState(userInfo.address);
    const [email, setEmail] = useState(userInfo.email);
    const [telephone, setTelephone] = useState(userInfo.telephone);

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsDialogOpen(true);
    };

    const handleConfirm = async () => {
        setIsDialogOpen(false);
        await UpdateUserInfo(fname, lname, address, telephone);
        // Additional actions after the update if needed
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
                            required
                        />
                        <TextField
                            id="lname"
                            label="Last Name"
                            defaultValue={lname}
                            onChange={(e) => setlName(e.target.value)}
                            color='success'
                            required
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
                        required
                    />
                    <TextField
                        id="address"
                        label="Shipping Address"
                        defaultValue={address}
                        onChange={(e) => setAddress(e.target.value)}
                        color='success'
                        required
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
