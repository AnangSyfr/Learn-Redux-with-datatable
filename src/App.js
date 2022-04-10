import React from "react";
import { Routes, Route } from "react-router-dom";
import AddMenu from "./components/AddMenu";
import EditMenu from "./components/EditMenu";
import HomeMenu from "./components/HomeMenu";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<HomeMenu />} />
            <Route path="/add-menu" element={<AddMenu />} />
            <Route path="/edit-menu/:id" element={<EditMenu />} />
        </Routes>
    );
};

export default App;
