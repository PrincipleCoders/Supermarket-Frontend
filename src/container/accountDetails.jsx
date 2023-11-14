import { useState } from 'react';
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
import {updateAdditionalData} from "../services/firebase-service.jsx";
import Footer from '../components/footer';
import Header from '../components/header';

const AccountDetails = () => {

    const userInfo = JSON.parse(localStorage.getItem('user'));

    const [fname, setfName] = useState(userInfo.name.split(' ')[0]);
    const [lname, setlName] = useState(userInfo.name.split(' ')[1]);
    const [address, setAddress] = useState(userInfo.address);
    const [email, setEmail] = useState(userInfo.email);
    const [telephone, setTelephone] = useState(userInfo.telephone);

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    console.log(userInfo);

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsDialogOpen(true);
    };

    const handleConfirm = async () => {
        setIsDialogOpen(false);
        const additionalData = {
            displayName: fname + ' ' + lname,
        }
        await updateAdditionalData(additionalData)
            .then(async () => {
                await UpdateUserInfo(address, telephone)
                    .then(() => {
                        showAlert('Account details updated successfully', 'success');
                    })
                    .catch((error) => {
                        console.error(error);
                        showAlert('Error while updating account details. Please try again', 'error');
                    })
            })
            .catch((error) => {
                console.error(error);
                showAlert('Error while updating account details. Please try again', 'error');
            })
    }

    const handleCancel = () => {
        // Cancel changes and close the dialog
        console.log('Canceled changes');
        setIsDialogOpen(false);
    };

    return (
        <>
        <Header/>
        <div style={{margin:'0px 50px'}}>
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
                            sx={{width:'48%'}}
                        />
                        <TextField
                            id="lname"
                            label="Last Name"
                            defaultValue={lname}
                            onChange={(e) => setlName(e.target.value)}
                            color='success'
                            required
                            sx={{width:'48%'}}
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
                    <TextField
                        id="image"
                        type='file'
                        label="image"
                        color='success'
                        inputProps={{ accept: 'image/*' }}
                        style={{ display: userInfo.socialLogin ? 'none' : 'block' }}
                        focused
                        fullWidth
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
            <Footer/>
        </>
    );
};

export default AccountDetails;
