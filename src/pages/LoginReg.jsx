import {useEffect, useState} from 'react';
import {startFirebaseAuthUI} from '../services/firebase-service';
import {Button, TextField} from '@mui/material';
import SnackbarAlert from "../components/SnackbarAlert.jsx";
import {register} from "../services/LoginReg-service.jsx";

export default function LoginReg() {
    const [alertStatus, setAlertStatus] = useState({type:'success',message:'',open:false});

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

    const handleLogin = (event) => {
        event.preventDefault();
        if (!validateInput(event.target.password.value, 'pwd')) {
            showAlert('Password must contain atleast\n 1 capital letter, simple letter and number\n with minimum 8 characters', 'error');
            return;
        }
        console.log(event.target.email.value);
    };

    const handleRegister = (event) => {
        event.preventDefault();
        if (!validateInput(event.target.firstName.value, 'name')) {
            showAlert('Name can only contain letters', 'error');
            return;
        }
        if (!validateInput(event.target.lastName.value, 'name')) {
            showAlert('Name can only contain letters', 'error');
            return;
        }
        if (!validateInput(event.target.password.value, 'pwd')) {
            showAlert('Password must contain at least 1 capital letter, simple letter and number with minimum 8 characters', 'error');
            return;
        }
        if (event.target.password.value !== event.target.confirmPassword.value) {
            showAlert('Confirm Password do not match', 'error');
            return;
        }
        if (event.target.profilePicture.files[0].size > 5000000) {
            showAlert('Profile Picture size must be less than 5MB', 'error');
            return;
        }

        const userData = {
            firstName: event.target.firstName.value,
            lastName: event.target.lastName.value,
            email: event.target.email.value,
            password: event.target.password.value,
            profilePicture: event.target.profilePicture.files[0]
        };

        register(userData).then((response) => {
            console.log(response);
            handleFormSwap();
            showAlert('Registration Successful, Please proceed to Login', 'success');
        }).catch((error) => {
            console.log(error);
            showAlert('Registration Failed', 'error');
        });
    }

    const showAlert = (message, type) => {
        setAlertStatus({type,message,open:true});
    }

    const validateInput = (input, type) => {
        switch (type) {
            case 'pwd':
                return input.length > 7 && /[a-z]/.test(input) && /[A-Z]/.test(input) && /\d/.test(input);
            case 'name':
                return !/\d/.test(input);
            default:
                return false;
        }
    }

    return (<div>
            <SnackbarAlert alertStatus={alertStatus} setAlertStatus={setAlertStatus}/>
            <div className="form">
                <h3>Sign In with Email</h3>
                <form onSubmit={handleLogin}>
                    <TextField
                        label="Email"
                        variant="outlined"
                        size="small"
                        type="email"
                        margin="normal"
                        required
                        name={"email"}
                    />
                    <TextField
                        label="Password"
                        variant="outlined"
                        size="small"
                        type="password"
                        margin="normal"
                        required
                        name={"password"}
                    />
                    <Button variant="contained" color="primary" size="medium" type={"submit"}>
                        Sign In
                    </Button>
                </form>
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
                <form onSubmit={handleRegister}>
                    <TextField
                        label="First Name"
                        variant="outlined"
                        size="small"
                        type="text"
                        margin="normal"
                        required
                        name={"firstName"}
                    />
                    <TextField
                        label="Last Name"
                        variant="outlined"
                        size="small"
                        type="text"
                        margin="normal"
                        required
                        name={"lastName"}
                    />
                    <TextField
                        label="Email"
                        variant="outlined"
                        size="small"
                        type="email"
                        margin="normal"
                        required
                        name={"email"}
                    />
                    <TextField
                        label="Password"
                        variant="outlined"
                        size="small"
                        type="password"
                        margin="normal"
                        required
                        name={"password"}
                    />
                    <TextField
                        label="Confirm Password"
                        variant="outlined"
                        size="small"
                        type="password"
                        margin="normal"
                        required
                        name={"confirmPassword"}
                    />
                    <TextField
                        label="Profile Picture"
                        variant="outlined"
                        type="file"
                        focused={true}
                        margin="normal"
                        name={"profilePicture"}
                        required
                    />
                    <Button variant="contained" color="primary" size="medium" type={"submit"}>
                        Sign Up
                    </Button>
                </form>
                <h5>
                    Already have an account?{' '}
                    <a href="#" onClick={handleFormSwap}>
                        Sign In
                    </a>
                </h5>
            </div>
        </div>);
}
