import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Display() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/Product")
      .then((res) => {
        setData(res.data.Product);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8080/deleteproduct/${id}`)
      .then(() => {
        alert("Product successfully deleted.");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEdit = (id) => {
    console.log(id);
  };

  return (
    <>
      <Link to={"/AddData"}>
        <button>Add Data</button>
      </Link>
      {data.map((item, index) => (
        <div key={index}>
          <Link to={`/Discription/${item.id}`}>
            <img src={item.image} width={"100px"} alt="" />
          </Link>
          <h2>{item.title}</h2>
          <p>{item.price}</p>
          <p>{item.id}</p>
          <p>{item.category}</p>
          <button onClick={() => handleDelete(item.id)}>Delete</button>
          <Link
            to={"/Update"}
            state={{
              id: item.id,
              title: item.title,
              price: item.price,
              category: item.category,
              description: item.description,
              image: item.image,
            }}
          >
            <button onClick={() => handleEdit(item.id)}>Edit</button>
          </Link>
        </div>
      ))}
    </>
  );
}

export default Display;
