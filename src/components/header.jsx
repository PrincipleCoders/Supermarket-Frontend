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

const pages = ['Home', 'Shop', 'Contact', 'About'];
const settings = ['My Account', 'Orders', 'Sign out'];
const isSigned = true;

function Header() {
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
        <AppBar position="fixed" elevation={0} sx={{ backgroundColor: '#191919',boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.05)' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <ShoppingBagIcon sx={{ display: { xs: 'none', md: 'flex', color:'#3bb77e' }, mr: 1, }} color='success' />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="#Home"
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
                        <Typography   variant="h6"
                        sx={{mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'Segoe UI',
                            fontWeight: 700,
                            letterSpacing: '.2rem',
                            color: '#cd853f',
                            textDecoration: 'none',}}>
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
                            <MenuIcon sx={{color:'#3bb77e'}} />
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
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography  textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <ShoppingBagIcon sx={{ display: { xs: 'flex', md: 'none',color:"#3bb77e" }, mr: 1 }} />
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
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={handleCloseNavMenu}
                                sx={{
                                    my: 2, color: '#ffffff', display: 'block', fontFamily: 'roboto',
                                    fontWeight: 700, margin: "0 15px"
                                }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>
                    <IconButton>
                        <ShoppingCartIcon sx={{ color: '#ffffff', margin: '0px 20px' }} />
                    </IconButton>
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
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>}
                </Toolbar>
            </Container>
        </AppBar>
        </div>
    );
}
export default Header;