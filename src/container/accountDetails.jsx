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
import {updateAdditionalData, uploadFile} from "../services/firebase-service.jsx";
import Footer from '../components/footer';
import Header from '../components/header';
import { useAlert } from '../components/AlertContext.jsx';

const AccountDetails = () => {
    const showAlert = useAlert();

    const userInfo = JSON.parse(localStorage.getItem('user'));

    const [fname, setfName] = useState(userInfo.name.split(' ')[0]);
    const [lname, setlName] = useState(userInfo.name.split(' ')[1]);
    const [address, setAddress] = useState(userInfo.address);
    const [email, setEmail] = useState(userInfo.email);
    const [telephone, setTelephone] = useState(userInfo.telephone);
    const [image, setImage] = useState();

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    console.log(userInfo);

    const updateLocalUserInfo = async () => {
        await GetUserInfo(userInfo.id)
        .then((data) => {
            localStorage.setItem('user', JSON.stringify(data));
        })
        .catch((error) => {
            console.log(error);
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsDialogOpen(true);
    };

    const handleConfirm = async () => {
        setIsDialogOpen(false);
        const additionalData = {
            name: fname + ' ' + lname,
        };

        if(userInfo.socialLogin && image){
            if (image.type.includes('image')) {
                showAlert('Profile Picture should be of image type', 'error');
                return;
            }
            if (image.size > 5000000) {
                showAlert('Profile Picture size must be less than 5MB', 'error');
                return;
            }

            const url = await uploadProfilePicture(userInfo.id, image);
            additionalData.photoURL = url;
        }

        updateAdditionalData(additionalData)
        .then(async () => {
            await UpdateUserInfo(userInfo.id, address, telephone);
            showAlert('Details updated successfully', 'success');
            // await updateLocalUserInfo();
        })
        .catch((error) => {
            console.log(error);
            showAlert('Error updating user details', 'error');
        });

    }

    const uploadProfilePicture = async (userID, file) => {
        const path = 'profilePictures/' + userID;
        // let result = null;
        return await uploadFile(path, file)
            .then((url) => {
                showAlert('Profile Picture uploaded successfully', 'success');
                return url;
            })
            .catch((error) => {
                console.log(error);
                if (error.code === 'storage/canceled') {
                    showAlert('Profile Picture upload cancelled', 'warning');
                } else {
                    showAlert('Profile Picture upload failed, Please try again', 'error');
                }
                throw error;
            });
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
