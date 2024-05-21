import React, { useState } from "react";
import "../../assets/css/App.css";

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(""); // Add category state
  const [isActive, setIsActive] = useState(true);
  const [productImage, setProductImage] = useState(null);
  const [error, setError] = useState(null);

  const handleImageChange = (e) => {
    setProductImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("productDescription", productDescription);
    formData.append("price", price);
    formData.append("category", category); // Include category in form data
    formData.append("isActive", isActive);
    formData.append("productImage", productImage);

    try {
      console.log("Sending data:", {
        productName,
        productDescription,
        price,
        category, // Log category
        isActive,
        productImage,
      });

      const response = await fetch(
        "http://localhost:4004/b4/products/addProduct",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        alert("Product created successfully!");
        // Reset form
        setProductName("");
        setProductDescription("");
        setPrice("");
        setCategory(""); // Reset category
        setIsActive(true);
        setProductImage(null);
      } else {
        const errorData = await response.json();
        console.error("Error creating product:", errorData);
        setError(errorData.message || "Error creating product.");
        alert("There was an error creating the product.");
      }
    } catch (error) {
      console.error("Error creating product:", error);
      setError(error.message || "There was an error creating the product.");
      alert("There was an error creating the product.");
    }
  };

  return (
    <div className="centered-form">
      <h2>Add Product</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Product Name</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Product Description</label>
          <textarea
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
          ></textarea>
        </div>
        <div>
          <label>Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="" disabled>
              Select a category
            </option>
            <option value="Living Room">Living Room</option>
            <option value="Dining Room">Dining Room</option>
            <option value="Bed Room">Bed Room</option>
            <option value="Home Office">Home Office</option>
          </select>
        </div>
        <div>
          <label>Active</label>
          <input
            type="checkbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
          />
        </div>
        <div>
          <label>Product Image</label>
          <input
            type="file"
            name="productImage" // Ensure the name matches
            onChange={handleImageChange}
            accept="image/*"
            required
          />
        </div>
        <button type="submit">Create Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
