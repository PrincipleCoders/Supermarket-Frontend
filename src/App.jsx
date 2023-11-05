import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/login" element={<Login/>} />
            </Routes>
        </BrowserRouter>
    );
}
