import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AccountDetails from './accountDetails';
import Orders from './orders';
import Cart from './cart';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export default function Profile() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box
            sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex',width:'100%' }}
        >
            <Tabs
                orientation="vertical"
                value={value}
                onChange={handleChange}
                // textColor="secondary" 
                // indicatorColor="secondary"
                aria-label="profile-tabs"
                sx={{
                    borderRight: 1,
                    borderColor: 'divider',
                    "& .MuiTabs-indicator": {
                        backgroundColor: '#3bb77e', 
                    },
                    "& .MuiTab-root": {
                        justifyContent: 'flex-start', 
                        "&.Mui-selected": {
                            color: '#F28330', 
                        },
                    },
                }}
            >
                <Tab label="Account Details" {...a11yProps(0)} />
                <Tab label="Orders" {...a11yProps(1)} />
                <Tab label="Cart" {...a11yProps(2)} />
                {/* <Tab label="Delivery" {...a11yProps(3)} />
                <Tab label="Item Five" {...a11yProps(4)} /> */}

            </Tabs>
            <TabPanel value={value} index={0}>
                <AccountDetails/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Orders/>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <Cart/>
            </TabPanel>
            <TabPanel value={value} index={3}>
                Item Four
            </TabPanel>
            <TabPanel value={value} index={4}>
                Item Five
            </TabPanel>

        </Box>
    );
}