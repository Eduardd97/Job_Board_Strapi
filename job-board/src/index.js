import "./index.css";
import App from "./App";
import Apply from "./pages/apply";
import { StrictMode } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ReactDOM from "react-dom/client";
import Expenses from "./pages/login";
import Dashboard from "./pages/dashboard";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<App />} />
                <Route path='login' element={<Expenses />} />
                <Route path='dashboard' element={<Dashboard />} />
                <Route path='apply' element={<Apply />} />
            </Routes>
        </BrowserRouter>
    </StrictMode>
);
