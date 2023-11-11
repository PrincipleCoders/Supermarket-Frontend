import {BrowserRouter, Route, Routes} from 'react-router-dom';
import LoginReg from "./container/LoginReg.jsx";
import {useState} from "react";
import SnackbarAlert from "./components/SnackbarAlert.jsx";
import Shop from "./container/shop.jsx";
import Profile from "./container/profile.jsx";
import Inventory from "./container/inventory.jsx";
import RemainingOrders from "./container/remainingOrders.jsx";
import ToDeliver from "./container/toDeliver.jsx";
import AllOrders from "./container/allOrders.jsx";

export default function App() {
    const [alertStatus, setAlertStatus] = useState({type:'success',message:'',open:false});

    const showAlert = (message,type) => {
        setAlertStatus({type:type, message:message, open:true});
    }

    return (
        <>
            <SnackbarAlert alertStatus={alertStatus} setAlertStatus={setAlertStatus}/>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<LoginReg showAlert={showAlert}/>}/>
                    <Route path="/" element={<Shop showAlert={showAlert}/>}/>
                    <Route path="/profile" element={<Profile showAlert={showAlert}/>}/>
                    <Route path="/inventory" element={<Inventory showAlert={showAlert}/>}/>
                    <Route path="/remainingOrders" element={<RemainingOrders showAlert={showAlert}/>}/>
                    <Route path="/toDeliver" element={<ToDeliver showAlert={showAlert}/>}/>
                    <Route path="/allOrders" element={<AllOrders showAlert={showAlert}/>}/>
                </Routes>
            </BrowserRouter>
        </>
    );
}
