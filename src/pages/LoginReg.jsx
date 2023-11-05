import { useEffect } from 'react';
import startFirebaseAuthUI from '../services/firebase-service';
import { Button, TextField } from '@mui/material';

export default function LoginReg() {
    useEffect(() => {
        startFirebaseAuthUI('#firebaseui-auth-container', 'loader')
            .then((idToken) => {
                console.log('IDToken', idToken);
            })
            .catch((error) => {
                console.log('error', error);
            });
    }, []);

    const handleFormSwap = () => {
        document.querySelectorAll('.form').forEach((form) => {
            form.classList.toggle('form--hidden');
        });
    };

    return (
        <div>
            <div className="form">
                <h3>Sign In with Email</h3>
                <TextField label="Email" variant="outlined" size="small" type="email" margin="normal" required/>
                <TextField label="Password" variant="outlined" size="small" type="password" margin="normal" required/>
                <Button variant="contained" color="primary" size="medium">
                    Sign In
                </Button>
                <div>
                    <h4>or continue with</h4>
                    <div id="firebaseui-auth-container"></div>
                    <div id="loader">Loading...</div>
                </div>
                <h5>
                    Don't have an account?{' '}
                    <a href="#" onClick={handleFormSwap}>
                        Sign Up
                    </a>
                </h5>
            </div>

            <div className="form form--hidden">
                <h3>Create New Account</h3>
                <TextField label="First Name" variant="outlined" size="small" type="text" margin="normal" required/>
                <TextField label="Last Name" variant="outlined" size="small" type="text" margin="normal" required/>
                <TextField label="Email" variant="outlined" size="small" type="email" margin="normal" required/>
                <TextField label="Password" variant="outlined" size="small" type="password" margin="normal" required/>
                <TextField label="Confirm Password" variant="outlined" size="small" type="password" margin="normal" required/>
                <Button variant="contained" color="primary" size="medium">
                    Sign Up
                </Button>
                <h5>
                    Already have an account?{' '}
                    <a href="#" onClick={handleFormSwap}>
                        Sign In
                    </a>
                </h5>
            </div>
        </div>
    );
}
