import React, { useState } from "react";
import '../App.css'
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function Update() {

   let Location=useLocation();
   let Navigate=useNavigate();

   const { id, image, title, price, description ,category} = Location.state;
     console.log(id);
   let [Updateimage,setUpdateimage]=useState(image);
   let [Updatetitle,setUpdatetitle]=useState(title);
   let [Updateprice,setUpdateprice]=useState(price);
   let [Updatecategory,setUpdatecategory]=useState(category);
   let [UpdateDescription, SetDescription] = useState(description);

    function handleUpdate(el){
        el.preventDefault();
        axios.patch(`http://localhost:8080/UpdateProduct/${id}`,{
            image:Updateimage,
            title:Updatetitle,
            price:Updateprice,
            description:UpdateDescription,
            category:Updatecategory
        }).then(()=>{
            alert("Product successfully updated!");
            Navigate('/');
        }).catch((err)=>{
            console.log(err);
        })
    }   





    return (<>

        <div className={`Overlay`}></div>
        <div className={`Overlay-modal`}>
            <form onSubmit={handleUpdate} action="" >
                <input type="text"  value={Updateimage} onChange={(e)=>{setUpdateimage(e.target.value)}} placeholder="Image URL...." /><br></br>
                <input type="text" value={Updatetitle} onChange={(e)=>{setUpdatetitle(e.target.value)}} placeholder="Title" /><br></br>
                <input type="text" value={Updateprice} onChange={(e)=>{setUpdateprice(e.target.value)}} placeholder="Price" /><br></br>
                <select value={Updatecategory} onChange={(e)=>{setUpdatecategory(e.target.value)}}>
                    <option value="">Select</option>
                    <option value="men's clothing">men's clothing</option>
                    <option value="jewelery">jewelery</option>
                    <option value="electronics">electronics</option>
                    <option value="women's clothing">women's clothing</option>
                </select><br></br>
                <input type="text" value={UpdateDescription} onChange={(e)=>{SetDescription(e.target.value)}} placeholder="Discription" /><br></br>
                <button     type="submit">Update</button>
            
            </form>
        </div>
        
    </>)
}

export default Update;