// import React from 'react';
// import {BrowserRouter} from "react-router";

import React, { useState, useEffect } from "react";
import { useCalculatePriceMutation, useGetProductsQuery,  } from "./state/calculatorApi";
import "./App.css";


function App() {
  const [product, setProduct] = useState("");
  const [options, setOptions] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [products, setProducts] = useState([])

  const [addCalculateForm, request] = useCalculatePriceMutation();
  const {data, isLoading} = useGetProductsQuery()


  console.log(`\n data: ${data}`, data)

  const handleProductChange = (event) => {
    setProduct(event.target.value);
    // const productId = event.target.value;
    // return products.map(target => {
    //   if (productId == target["id"]){
    //     setProduct(target["id"])
    //   }
    // })
  };

  const handleOptionChange = (event, index) => {
    const newOptions = [...options];
    newOptions[index][event.target.name] = event.target.value;
    setOptions(newOptions);
  };

  const handleAddOption = () => {
    setOptions([...options, { name: "", value: "" }]);
  };

  const handleRemoveOption = (index) => {
    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      product_id: product,
      selected_options: options,
      quantity: quantity,
    };
    console.log(data, "i am data");
    const formData = new FormData();
    formData.append("product_id", product)
    formData.append("selected_options", JSON.stringify(options))
    formData.append("quantity", quantity)
    console.log('kflgkfl', formData.get("selected_options"), options);

    addCalculateForm(formData)
    .unwrap()
    .then(data=>setTotalPrice(data.total_price))
    .then(err=>console.log(err))
  };

  const handleChange = (event) => {
    // const { name, value } = event.target;
    // setFormData((prevState) => ({
    //   ...prevState,
    //   [name]: value,
    // }));
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="product">Product:</label>
        <select name="product" onChange={handleProductChange}>
          <option value="">Select a product</option>
          {data && data.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="options">Options:</label>
        {options.map((option, index) => (
          <div key={index}>
            <input
              type="text"
              name="name"
              value={option.name}
              onChange={(event) => handleOptionChange(event, index)}
            />
            <input
              type="text"
              name="value"
              value={option.value}
              onChange={(event) => handleOptionChange(event, index)}
            />
            <button type="button" onClick={() => handleRemoveOption(index)}>
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddOption}>
          Add Option
        </button>
      </div>
      <div className="form-group">
        <label htmlFor="quantity">Quantity:</label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          value={quantity}
          onChange={handleQuantityChange}
        />
      </div>
      <div>
        <button type="submit">Calculate Price</button>
      </div>
      <div>
        <label htmlFor="total-price">Total Price:</label>
        <span id="total-price">{totalPrice}</span>
      </div>
    </form>
    </div>
  );
}

export default App;

// export default App
