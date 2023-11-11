import {BrowserRouter, Route, Routes} from 'react-router-dom';
import LoginReg from "./container/LoginReg.jsx";
import {useState} from "react";
import SnackbarAlert from "./components/SnackbarAlert.jsx";
import {AlertProvider} from "./components/AlertContext.jsx";
import Shop from "./container/shop.jsx";
import Profile from "./container/profile.jsx";
import Inventory from "./container/inventory.jsx";
import RemainingOrders from "./container/remainingOrders.jsx";
import ToDeliver from "./container/toDeliver.jsx";
import AllOrders from "./container/allOrders.jsx";
import Orders from './container/orders.jsx';
import Cart from './container/cart.jsx';
import AccountDetails from './container/accountDetails.jsx';

export default function App() {
    const [alertStatus, setAlertStatus] = useState({type:'success',message:'',open:false});

    const showAlert = (message,type) => {
        setAlertStatus({type:type, message:message, open:true});
    }

    return (
        <>
            <AlertProvider value={showAlert}>
                <SnackbarAlert alertStatus={alertStatus} setAlertStatus={setAlertStatus}/>
                <BrowserRouter>
                    <Routes>
                        <Route path="/login" element={<LoginReg/>}/>
                        <Route path="/" element={<Shop/>}/>
                        <Route path="/account" element={<AccountDetails/>}/>
                        <Route path="/inventory" element={<Inventory/>}/>
                        <Route path="/remainingOrders" element={<RemainingOrders/>}/>
                        <Route path="/toDeliver" element={<ToDeliver/>}/>
                        <Route path="/allOrders" element={<AllOrders/>}/>
                        <Route path="/orders" element={<Orders/>}/>
                        <Route path="/cart" element={<Cart/>}/>
                        <Route path="/toDeliver" element={<ToDeliver/>}/>
                    </Routes>
                </BrowserRouter>
            </AlertProvider>
        </>
    );
}
