
import React, { useEffect, useState } from "react";

const API = "http://localhost:8080";

function AddProduct() {
  const [product, setProduct] = useState({
    productName: "",
    category: "",
    brand: "",
    price: "",
    image: ""
  });

  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");

  const [sizes, setSizes] = useState([
    { size: "S", stock: 0 },
    { size: "M", stock: 0 },
    { size: "L", stock: 0 },
    { size: "XL", stock: 0 }
  ]);

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  function handleChange(e) {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
  }

  function handleImageChange(e) {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert("Image size should be less than 10MB");
      return;
    }

    setImageFile(file);
    setPreview(URL.createObjectURL(file));
    setProduct({
      ...product,
      image: ""
    });
  }

  function handleSizeStockChange(index, value) {
    const updatedSizes = [...sizes];

    updatedSizes[index].stock = Number(value);

    setSizes(updatedSizes);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!imageFile) {
      alert("Please select a product image");
      return;
    }

    setSaving(true);

    try {
      // Step 1: Upload image
      const formData = new FormData();
      formData.append("file", imageFile);

      const uploadResponse = await fetch(
        `${API}/upload-image`,
        {
          method: "POST",
          body: formData
        }
      );

      if (!uploadResponse.ok) {
        const errorMessage = await uploadResponse.text();
        throw new Error(errorMessage || "Image upload failed");
      }

      const uploadData = await uploadResponse.json();

      // Step 2: Save product details
      const response = await fetch(`${API}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...product,
          image: uploadData.image,
          price: Number(product.price),
          stock: 0
        })
      });

      if (!response.ok) {
        throw new Error("Product not added");
      }

      const savedProduct = await response.json();
      const productId = savedProduct.productId;

      // Step 3: Save sizes and stock
      const sizeResponses = await Promise.all(
        sizes.map((item) => {
          const params = new URLSearchParams({
            productId: productId,
            size: item.size,
            stock: item.stock
          });

          return fetch(
            `${API}/product-sizes?${params}`,
            {
              method: "POST"
            }
          );
        })
      );

      if (sizeResponses.some((res) => !res.ok)) {
        throw new Error(
          "Product saved, but some sizes could not be saved"
        );
      }

      alert("Product, image and sizes added successfully!");

      // Step 4: Clear form
      setProduct({
        productName: "",
        category: "",
        brand: "",
        price: "",
        image: ""
      });

      setImageFile(null);
      setPreview("");

      document.getElementById("productImage").value = "";

      setSizes([
        { size: "S", stock: 0 },
        { size: "M", stock: 0 },
        { size: "L", stock: 0 },
        { size: "XL", stock: 0 }
      ]);

    } catch (error) {
      alert(error.message || "Unable to add product");
      console.error(error);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="admin-content">

      <h2>Add New Product</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="productName"
          placeholder="Product Name"
          value={product.productName}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={product.category}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="brand"
          placeholder="Brand"
          value={product.brand}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={product.price}
          onChange={handleChange}
          min="0"
          step="0.01"
          required
        />

        <h3>Upload Product Image</h3>

        <input
          type="file"
          id="productImage"
          accept="image/*"
          onChange={handleImageChange}
          required
        />

        {preview && (
          <div style={{ marginTop: "15px" }}>
            <p><b>Image Preview:</b></p>

            <img
              src={preview}
              alt="Product Preview"
              style={{
                width: "180px",
                height: "180px",
                objectFit: "contain",
                border: "1px solid #ccc",
                padding: "5px",
                borderRadius: "8px"
              }}
            />
          </div>
        )}

        <h3>Available Sizes & Stock</h3>

        {sizes.map((item, index) => (
          <div key={item.size}>
            <label>
              Size: {item.size}
            </label>

            <input
              type="number"
              min="0"
              placeholder={`Stock for ${item.size}`}
              value={item.stock}
              onChange={(e) =>
                handleSizeStockChange(index, e.target.value)
              }
              required
            />
          </div>
        ))}

        <button type="submit" disabled={saving}>
          {saving ? "Uploading & Adding..." : "Add Product"}
        </button>

      </form>

    </div>
  );
}

export default AddProduct;
