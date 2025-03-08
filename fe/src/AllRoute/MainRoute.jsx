import React from "react";
import { Route, Routes } from "react-router";
import Update from "../Component/Update";
import Display from "../Component/Display";
import AddData from "../Component/AddData";
import Discription from "../Component/Discription";

function MainRoute() {
  return (
    <>
      <Routes>
        {/* <Route path="/" element={<h1>Welcome to Home Page</h1>} /> Default Route */}
        <Route path="/" element={<Display />} />
        <Route path="/AddData" element={<AddData />} />
        <Route path="/Update" element={<Update />} />
        <Route path="/Discription/:id" element={<Discription />} />

        {/* <Route path="*" element={<h1>404 - Page Not Found</h1>} /> Fallback Route */}
      </Routes>
    </>
  );
}

export default MainRoute;
