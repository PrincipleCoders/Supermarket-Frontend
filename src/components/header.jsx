import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { signOut } from "../services/firebase-service.jsx";
import { useNavigate } from "react-router-dom";
import { useAlert } from "./AlertContext.jsx";
import { Link } from 'react-router-dom';
import ProtectedRoute from "./ProtectedRoute.jsx";

function Header() {
    const showAlert = useAlert();
    const navigate = useNavigate();


    const pages = [
        { Name: 'SHOP', Path: '/' , roles:['CUSTOMER'] },
        { Name: 'ORDERS', Path: '/orders' , roles:['CUSTOMER'] },
        { Name: 'TO Pack', Path: '/remainingOrders' , roles:['ADMIN'] },
        { Name: 'All Orders', Path: '/allOrders' , roles:['ADMIN'] },
        { Name: 'Inventory', Path: '/inventory' , roles:['ADMIN'] },
        { Name: 'To Deliver', Path: '/toDeliver' , roles:['DELIVERY']},
        { Name: 'All Users', Path: '/allUsers' , roles:['ADMIN']},
    ];
    const handleSignOut = () => {
        signOut()
            .then(() => {
                showAlert('Signed out successfully', 'success');
                navigate('/login');
            })
            .catch((error) => {
                console.error(error);
                showAlert('Error signing out', 'error');
            });
    }

    const settings = [{ label: 'My Account', onClick: () => { history.push('/account'); } }, { label: 'Orders', onClick: null }, { label: 'Sign Out', onClick: handleSignOut }];
    const isSigned = true;



    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);

    };

    return (
        <div style={{ marginBottom: '90px' }}>
            <AppBar position="fixed" elevation={0} sx={{ backgroundColor: '#191919', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.05)' }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <ShoppingBagIcon sx={{ display: { xs: 'none', md: 'flex', color: '#3bb77e' }, mr: 1, }} color='success' />
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'Segoe UI',
                                fontWeight: 700,
                                letterSpacing: '.2rem',
                                color: '#3bb77e',
                                textDecoration: 'none',
                            }}
                        >
                            shop
                            <Typography variant="h6"
                                sx={{
                                    mr: 2,
                                    display: { xs: 'none', md: 'flex' },
                                    fontFamily: 'Segoe UI',
                                    fontWeight: 700,
                                    letterSpacing: '.2rem',
                                    color: '#cd853f',
                                    textDecoration: 'none',
                                }}>
                                X
                            </Typography>
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="#282c34"
                            >
                                <MenuIcon sx={{ color: '#3bb77e' }} />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                {pages.map((page, index) => (
                                    <MenuItem key={index} onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center" href={page.Path}> {page.Name}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        <ShoppingBagIcon sx={{ display: { xs: 'flex', md: 'none', color: "#3bb77e" }, mr: 1 }} />
                        <Typography
                            variant="h5"
                            noWrap
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: '#fffff',
                                textDecoration: 'none',
                            }}
                        >
                            ShopX
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {pages.map((page, index) => (
                                <ProtectedRoute isLink={true} roles={page.roles} key={index} element={(
                                    <Button
                                        key={index}
                                        onClick={() => {
                                            setSelected(page.Path);

                                        }
                                        }

                                        sx={{
                                            my: 2,
                                            color: '#ffffff',
                                            display: 'block',
                                            fontFamily: 'roboto',
                                            fontWeight: 700,
                                            margin: '0 15px',
                                        }}
                                        href={page.Path}
                                    >
                                        {page.Name}
                                    </Button>
                                )} />
                            ))}
                        </Box>

                        <ProtectedRoute roles={['CUSTOMER']} element={(
                            <IconButton href='/cart'>
                                <ShoppingCartIcon sx={{ color: '#ffffff', margin: '0px 20px' }} />
                            </IconButton>
                        )} />
                        {!isSigned && <Button variant="contained" color='success'> Sign In</Button>}
                        {isSigned && <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {/* {settings.map((setting) => (
                                    <MenuItem key={setting.label} onClick={setting.onClick}>
                                        <Typography textAlign="center">{setting.label}</Typography>
                                    </MenuItem>
                                ))} */}
                                <MenuItem >
                                    <Link to="/account" style={{ textDecoration: 'none',color:'inherit' }}>
                                        <Typography textAlign="center">My Account</Typography>
                                    </Link>
                                </MenuItem>
                                <MenuItem onClick={handleSignOut}>
                                        <Typography textAlign="center">Sign Out</Typography>                    
                                </MenuItem>
                            </Menu>
                        </Box>}
                    </Toolbar>
                </Container>
            </AppBar>
        </div>
    );
}
export default Header;