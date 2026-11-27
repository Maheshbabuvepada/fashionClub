
import React, { useState } from "react";

function Admin() {
  const [product, setProduct] = useState({
    productName: "",
    category: "",
    brand: "",
    size: "",
    price: "",
    stock: 0,
  });

  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!image) {
        setMessage("Please select an image");
        return;
      }

      const formData = new FormData();
      formData.append("file", image);

      const uploadResponse = await fetch(
        "http://localhost:8080/upload-image",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!uploadResponse.ok) {
        throw new Error("Image upload failed");
      }

      const uploadData = await uploadResponse.json();

      const productResponse = await fetch(
        "http://localhost:8080/products",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...product,
            price: Number(product.price),
            stock: Number(product.stock),
            image: uploadData.image,
          }),
        }
      );

      if (!productResponse.ok) {
        throw new Error("Product save failed");
      }

      setMessage("Product added successfully!");

      setProduct({
        productName: "",
        category: "",
        brand: "",
        size: "",
        price: "",
        stock: 0,
      });
      setImage(null);
      e.target.reset();

    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Add Product</h2>

      <form onSubmit={handleSubmit}>
        <input className="form-control mb-3"
          name="productName" placeholder="Product Name"
          value={product.productName} onChange={handleChange} required />

        <input className="form-control mb-3"
          name="category" placeholder="Category"
          value={product.category} onChange={handleChange} required />

        <input className="form-control mb-3"
          name="brand" placeholder="Brand"
          value={product.brand} onChange={handleChange} required />

        <input className="form-control mb-3"
          name="size" placeholder="Size"
          value={product.size} onChange={handleChange} required />

        <input className="form-control mb-3"
          type="number" name="price" placeholder="Price"
          value={product.price} onChange={handleChange} required />

        <input className="form-control mb-3"
          type="number" name="stock" placeholder="Stock"
          value={product.stock} onChange={handleChange} required />

        <label className="form-label">Choose Product Image</label>
        <input className="form-control mb-3"
          type="file" accept="image/*"
          onChange={(e) => setImage(e.target.files[0])} required />

        <button className="btn btn-dark" type="submit">
          Add Product
        </button>
      </form>

      <p className="mt-3">{message}</p>
    </div>
  );
}

export default Admin;
