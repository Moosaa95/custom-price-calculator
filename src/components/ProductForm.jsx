import React, { useEffect, useState } from "react";

const ProductForm = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(null);

  useEffect(() => {
    async function FetchProducts() {
      try {
        const response = await fetch(
          "http://localhost:8080/calculator/products/"
        );
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    }
    FetchProducts();
  }, []);

  const handleProductChange = (e) => {
    const productId = parseInt(e.target.value);
    setSelectedProduct(products.find((product) => product.id === productId));
  };

  const handleOptionChange = (optionName, optionValue) => {
    const newSelectedOptions = [...selectedOptions];
    const existingOptionIndex = newSelectedOptions.findIndex(
      (option) => option.name === optionName
    );

    if (existingOptionIndex !== -1) {
      // If an option with this name already exists, update its value
      newSelectedOptions[existingOptionIndex].value = optionValue;
    } else {
      // Otherwise, add a new option with this name and value
      newSelectedOptions.push({ name: optionName, value: optionValue });
    }
    setSelectedOptions(newSelectedOptions);
  };

  const handleQuantityChange = (event) => {
    // Update the selected quantity when the user selects a new one
    setQuantity(parseInt(event.target.value));
  };

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/products/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product: selectedProduct.id,
          selected_options: selectedOptions,
          quantity: quantity,
        }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data);
      setTotalPrice(data.total_price)
    } catch (error) {
      console.error(error);
    }
  }

  return <div>ProductForm</div>;
};

export default ProductForm;
