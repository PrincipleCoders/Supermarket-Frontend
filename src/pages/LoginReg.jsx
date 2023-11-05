import {useEffect, useState} from 'react';
import {startFirebaseAuthUI} from '../services/firebase-service';
import {Alert, Button, Snackbar, TextField} from '@mui/material';

export default function LoginReg() {
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [regEmail, setRegEmail] = useState('');
    const [regPassword, setRegPassword] = useState('');
    const [regConfirmPassword, setRegConfirmPassword] = useState('');
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
        if (!validateInput(loginPassword, 'pwd')) {
            showAlert('Password must contain atleast\n 1 capital letter, simple letter and number\n with minimum 8 characters', 'error');
            return;
        }
        console.log(loginEmail, loginPassword);
    };

    const handleRegister = (event) => {
        event.preventDefault();
        if (!validateInput(firstName, 'name')) {
            showAlert('Name can only contain letters', 'error');
            return;
        }
        if (!validateInput(lastName, 'name')) {
            showAlert('Name can only contain letters', 'error');
            return;
        }
        if (!validateInput(regPassword, 'pwd')) {
            showAlert('Password must contain atleast 1 capital letter, simple letter and number with minimum 8 characters', 'error');
            return;
        }
        if (regPassword !== regConfirmPassword) {
            showAlert('Confirm Password do not match', 'error');
            return;
        }
        console.log(firstName, lastName, regEmail, regPassword, regConfirmPassword);
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
            <Snackbar
                open={alertStatus.open}
                anchorOrigin={{vertical:'top',horizontal:'right'}}
                autoHideDuration={6000}
                onClose={() => setAlertStatus({...alertStatus,open:false})}
                id={'snackbar'}
            >
                <Alert severity={alertStatus.type} variant={"filled"}>{alertStatus.message}</Alert>
            </Snackbar>
            <div className="form">
                <h3>Sign In with Email</h3>
                <form onSubmit={handleLogin}>
                    <TextField
                        label="Email"
                        variant="outlined"
                        size="small"
                        type="email"
                        margin="normal"
                        required value={loginEmail}
                        onChange={event => setLoginEmail(event.target.value)}
                    />
                    <TextField
                        label="Password"
                        variant="outlined"
                        size="small"
                        type="password"
                        margin="normal"
                        required
                        value={loginPassword}
                        onChange={event => setLoginPassword(event.target.value)}
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
                        value={firstName}
                        onChange={event => setFirstName(event.target.value)}
                    />
                    <TextField
                        label="Last Name"
                        variant="outlined"
                        size="small"
                        type="text"
                        margin="normal"
                        required
                        value={lastName}
                        onChange={event => setLastName(event.target.value)}
                    />
                    <TextField
                        label="Email"
                        variant="outlined"
                        size="small"
                        type="email"
                        margin="normal"
                        required
                        value={regEmail}
                        onChange={event => setRegEmail(event.target.value)}
                    />
                    <TextField
                        label="Password"
                        variant="outlined"
                        size="small"
                        type="password"
                        margin="normal"
                        required
                        value={regPassword}
                        onChange={event => setRegPassword(event.target.value)}
                    />
                    <TextField
                        label="Confirm Password"
                        variant="outlined"
                        size="small"
                        type="password"
                        margin="normal"
                        required
                        value={regConfirmPassword}
                        onChange={event => setRegConfirmPassword(event.target.value)}
                    />
                    <TextField
                        label="Profile Picture"
                        variant="outlined"
                        type="file"
                        focused={true}
                        margin="normal"
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
