import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Discription() {
  const { id } = useParams();
  let [descriptiondata, setdescriptiondata] = useState({});
  function getdata() {
    axios
      .get(`http://localhost:8080/Discription/${id}`)
      .then((res) => {
        setdescriptiondata(res.data);
      })
      .catch((err) => {
        console.log("Error fetching product details:", err);
      });
  }

  useEffect(() => {
    getdata();
  }, []);

  return (
    <div>
      <div>
        <img src={descriptiondata.image} width={"100px"} alt="" />
        <h2>{descriptiondata.title}</h2>
        <p>{descriptiondata.price}</p>
        <p>{descriptiondata.id}</p>
        <p>{descriptiondata.category}</p>
        <p>{descriptiondata.description}</p>
      </div>
    </div>
  );
}

export default Discription;
