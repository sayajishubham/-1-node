import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddData() {
  let Navigate = useNavigate();

  let assing = {
    image: "",
    title: "",
    price: "",
    category: "",
    discription: "",
  };
  let [ProductData, SetProductData] = useState(assing);

  console.log(ProductData);

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post("http://localhost:8080/Addproduct", ProductData)
      .then((res) => {
        SetProductData(res.data.Product);
        Navigate("/");
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handlechange = (e) => {
    SetProductData({ ...ProductData, [e.target.name]: e.target.value });
    console.log(e.target.value);
  };

  return (
    <form action="" onSubmit={handleSubmit}>
      <input
        type="text"
        name="image"
        value={ProductData?.image}
        onChange={handlechange}
        placeholder="Image URL...."
      />
      <br></br>
      <input
        type="text"
        name="title"
        value={ProductData?.title}
        onChange={handlechange}
        placeholder="Title"
      />
      <br></br>
      <input
        type="text"
        name="price"
        value={ProductData?.price}
        onChange={handlechange}
        placeholder="Price"
      />
      <br></br>
      <select
        name="category"
        value={ProductData?.category}
        onChange={handlechange}
      >
        <option value="">Select</option>
        <option value="men's clothing">men's clothing</option>
        <option value="jewelery">jewelery</option>
        <option value="electronics">electronics</option>
        <option value="women's clothing">women's clothing</option>
      </select>
      <br></br>
      <input
        type="text"
        name="discription"
        value={ProductData?.discription}
        onChange={handlechange}
        placeholder="Discription"
      />
      <br></br>
      <button type="submit">Submit</button>
    </form>
  );
}

export default AddData;
