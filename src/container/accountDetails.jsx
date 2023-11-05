
import React, { useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { useState } from 'react';
import '../styles/AccountDetails.css'



const AccountDetails = (props) => {

    const [fname, setfName] = useState(props.fname || '');
    const [lname, setlName] = useState(props.lname || '');
    const [address, setAddress] = useState(props.address || '');
    const [email, setEmail] = useState(props.email || '');


    const handleSubmit = (event) => {
        event.preventDefault(); 
        console.log('First Name:', fname);
        console.log('Last Name:', lname);
        console.log('Email Address:', email);
        console.log('Shipping Address:', address);
    
    };
    

    return (
        <div>
                <form onSubmit={handleSubmit}>
            <h3 className='ac-details-headding'>Account Details</h3>
            <div className="account-details">
                    <div className="profile-name">
                    <TextField
                            id="fname"
                            label="First Name"
                            defaultValue={fname}
                            onChange={(e) => setfName(e.target.value)} // Update the state when the input changes
                        />
                        <TextField
                            id="lname"
                            label="Last Name"
                            defaultValue={lname}
                            onChange={(e) => setlName(e.target.value)} // Update the state when the input changes
                        />

                    </div>

                    <TextField
                        id="email"
                        label="Email Address"
                        defaultValue={email}
                        onChange={(e) => setEmail(e.target.value)} // Update the state when the input changes
                    />
                    <TextField
                        id="address"
                        label="Shipping Address"
                        defaultValue={address}
                        onChange={(e) => setAddress(e.target.value)} // Update the state when the input changes
                    />

                    <Button type="submit" variant='contained' color='success' sx={{ backgroundColor: "#3bb77e", width: '150px' }}>Save Changes</Button>
            </div>
                </form>
        </div>
    );
};

export default AccountDetails;
