import {useEffect} from 'react';
import {signInWithEmail, startFirebaseAuthUI, createUserWithEmail} from '../services/firebase-service';
import {Button, LinearProgress, TextField} from '@mui/material';
import {useNavigate} from "react-router-dom";

export default function LoginReg({showAlert}) {
    const navigate = useNavigate();

    useEffect(() => {
        startFirebaseAuthUI('#firebaseui-auth-container', 'loader')
            .then((idToken) => {
                console.log('IDToken', idToken);
            })
            .catch((error) => {
                console.log('error', error);
            });
    }, []);

    const toggleLoader = (state) => {
        document.getElementById('loader').style.display = state ? 'block':'none';
    }

    const handleFormSwap = () => {
        document.querySelectorAll('.form').forEach((form) => {
            form.classList.toggle('form--hidden');
        });
    };

    const handleLogin = (event) => {
        event.preventDefault();
        if (!validateInput(event.target.password.value, 'pwd')) {
            showAlert('Password must contain at least\n 1 capital letter, simple letter and number\n with minimum 8 characters', 'error');
            return;
        }

        toggleLoader(true);
        signInWithEmail(event.target.email.value, event.target.password.value)
            //TODO:validate login
            .then((userCredential) => {
                toggleLoader(false);
                // Signed in
                const user = userCredential.user;
                console.log(user);
                navigate('/');
                showAlert('Login Successful', 'success');
            })
            .catch((error) => {
                toggleLoader(false)
                console.log(error.code, error.message);
                if (error.code === 'auth/network-request-failed'){
                    showAlert('No network connection', 'warning')
                }
                else{
                    showAlert('Login Failed, Email or Password incorrect', 'error');
                }
            })
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

        toggleLoader(true)
        createUserWithEmail(event.target.email.value, event.target.password.value)
            .then(cred=>{
                toggleLoader(false)
                console.log(cred.user);
                navigate('/login')
                showAlert('Registration Successful, Please Sign In')
            })
            .catch(error=>{
                toggleLoader(false)
                console.log(error);
                if (error.code === 'auth/network-request-failed'){
                    showAlert('Network connection error', 'warning')
                }
                else if(error.code === 'auth/email-already-in-use'){
                    showAlert('Entered email already in use', 'error');
                }
                else {
                    showAlert('Something went wrong, Please try again', 'error')
                }
            })

        // const userData = {
        //     firstName: event.target.firstName.value,
        //     lastName: event.target.lastName.value,
        //     email: event.target.email.value,
        //     password: event.target.password.value,
        //     profilePicture: event.target.profilePicture.files[0]
        // };
        //
        // register(userData).then((response) => {
        //     console.log(response);
        //     handleFormSwap();
        //     showAlert('Registration Successful, Please proceed to Login', 'success');
        // }).catch((error) => {
        //     console.log(error);
        //     showAlert('Registration Failed', 'error');
        // });


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
        <LinearProgress id={'loader'} hidden/>
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
