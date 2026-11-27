
import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import "../MyStyle.css";

const API = "http://localhost:8080";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [productSizes, setProductSizes] = useState([]);
  const [stockValues, setStockValues] = useState({});
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [editingProduct, setEditingProduct] = useState(null);

  const [productForm, setProductForm] = useState({
    productName: "",
    category: "",
    brand: "",
    price: "",
    image: ""
  });

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      const productResponse = await fetch(`${API}/admin/products`);

      if (!productResponse.ok) {
        throw new Error("Unable to fetch products");
      }

      const productData = await productResponse.json();
      setProducts(productData);

      const sizeResponse = await fetch(`${API}/product-sizes`);

      if (!sizeResponse.ok) {
        throw new Error("Unable to fetch product sizes");
      }

      const sizeData = await sizeResponse.json();
      setProductSizes(sizeData);

      const initialStocks = {};

      sizeData.forEach((item) => {
        initialStocks[item.id] = item.stock;
      });

      setStockValues(initialStocks);
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  function handleStockChange(id, value) {
    setStockValues((previous) => ({
      ...previous,
      [id]: value
    }));
  }

  async function updateStock(id) {
    const stock = Number(stockValues[id]);

    if (
      stockValues[id] === "" ||
      !Number.isInteger(stock) ||
      stock < 0
    ) {
      setMessage("Please enter a valid stock number");
      return;
    }

    try {
      setSavingId(id);
      setMessage("");

      const response = await fetch(
        `${API}/product-sizes/${id}?stock=${stock}`,
        { method: "PUT" }
      );

      if (!response.ok) {
        throw new Error("Unable to update stock");
      }

      setProductSizes((previous) =>
        previous.map((item) =>
          item.id === id ? { ...item, stock } : item
        )
      );

      setMessage("Stock updated successfully!");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setSavingId(null);
    }
  }

  function handleEdit(product) {
    setEditingProduct(product.productId);

    setProductForm({
      productName: product.productName || "",
      category: product.category || "",
      brand: product.brand || "",
      price: product.price ?? "",
      image: product.image || ""
    });

    setMessage("");
  }

  function handleFormChange(e) {
    setProductForm({
      ...productForm,
      [e.target.name]: e.target.value
    });
  }

  async function handleUpdateProduct(e) {
    e.preventDefault();

    try {
      setMessage("");

      const response = await fetch(
        `${API}/products/${editingProduct}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            ...productForm,
            price: Number(productForm.price)
          })
        }
      );

      if (!response.ok) {
        throw new Error("Unable to update product");
      }

      const updatedProduct = await response.json();

      setProducts((previous) =>
        previous.map((item) =>
          item.productId === editingProduct
            ? updatedProduct
            : item
        )
      );

      setEditingProduct(null);
      setMessage("Product updated successfully!");
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function handleDeleteProduct(productId) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      setMessage("");

      const response = await fetch(
        `${API}/products/${productId}`,
        { method: "DELETE" }
      );

      if (!response.ok) {
        throw new Error("Unable to delete product");
      }

      setProducts((previous) =>
        previous.filter(
          (item) => item.productId !== productId
        )
      );

      setProductSizes((previous) =>
        previous.filter(
          (item) => item.product?.productId !== productId
        )
      );

      setMessage("Product deleted successfully!");
    } catch (error) {
      setMessage(error.message);
    }
  }

  if (sessionStorage.getItem("adminLoggedIn") !== "true") {
    return <Navigate to="/admin-login" replace />;
  }

  return (
    <div className="container mt-4 admin-products-page">

      <h2 className="admin-products-heading">
        Manage Products
      </h2>

      <Link to="/admin-dashboard" className="admin-back-btn">
        Back to Dashboard
      </Link>

      {loading && <p>Loading products...</p>}

      {error && <p className="admin-error">{error}</p>}

      {message && <p className="admin-message">{message}</p>}

      {editingProduct !== null && (
        <div className="admin-edit-form">

          <h3>Edit Product</h3>

          <form onSubmit={handleUpdateProduct}>

            <input
              type="text"
              name="productName"
              placeholder="Product Name"
              value={productForm.productName}
              onChange={handleFormChange}
              required
            />

            <input
              type="text"
              name="category"
              placeholder="Category"
              value={productForm.category}
              onChange={handleFormChange}
              required
            />

            <input
              type="text"
              name="brand"
              placeholder="Brand"
              value={productForm.brand}
              onChange={handleFormChange}
              required
            />

            <input
              type="number"
              name="price"
              placeholder="Price"
              min="0"
              step="0.01"
              value={productForm.price}
              onChange={handleFormChange}
              required
            />

            <input
              type="text"
              name="image"
              placeholder="Image filename"
              value={productForm.image}
              onChange={handleFormChange}
              required
            />

            <button type="submit" className="admin-update-btn">
              Update Product
            </button>

            <button
              type="button"
              className="admin-cancel-btn"
              onClick={() => setEditingProduct(null)}
            >
              Cancel
            </button>

          </form>
        </div>
      )}

      {!loading && !error && (
        <div className="table-responsive">

          <table className="table table-bordered table-striped admin-products-table">

            <thead>
              <tr>
                <th>ID</th>
                <th>Image</th>
                <th>Product Name</th>
                <th>Category</th>
                <th>Brand</th>
                <th>Size</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {products.length > 0 ? (

                products.map((product) => {

                  const sizes = productSizes.filter(
                    (item) =>
                      item.product?.productId === product.productId
                  );

                  const rows = sizes.length > 0 ? sizes : [null];

                  const imageUrl = product.image
                    ? `${API}/images/${encodeURIComponent(product.image)}`
                    : "";

                  return rows.map((item, index) => (

                    <tr key={item ? item.id : product.productId}>

                      <td>{product.productId}</td>

                      <td>
                        {imageUrl ? (
                          <img
                            src={imageUrl}
                            alt={product.productName}
                            style={{
                              width: "75px",
                              height: "75px",
                              objectFit: "contain"
                            }}
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                            }}
                          />
                        ) : (
                          "-"
                        )}
                      </td>

                      <td>{product.productName}</td>

                      <td>{product.category}</td>

                      <td>{product.brand}</td>

                      <td>{item ? item.size : "-"}</td>

                      <td>₹{product.price}</td>

                      <td>
                        {item ? (
                          <div className="admin-stock-cell">

                            <input
                              type="number"
                              min="0"
                              value={stockValues[item.id] ?? ""}
                              onChange={(e) =>
                                handleStockChange(item.id, e.target.value)
                              }
                            />

                            <button
                              className="admin-stock-save"
                              disabled={savingId === item.id}
                              onClick={() => updateStock(item.id)}
                            >
                              {savingId === item.id
                                ? "Saving..."
                                : "Save Stock"}
                            </button>

                          </div>
                        ) : "-"}
                      </td>

                      <td>
                        {index === 0 && (
                          <div className="admin-action-buttons">

                            <button
                              className="admin-edit-btn"
                              onClick={() => handleEdit(product)}
                            >
                              Edit
                            </button>

                            <button
                              className="admin-delete-btn"
                              onClick={() =>
                                handleDeleteProduct(product.productId)
                              }
                            >
                              Delete
                            </button>

                          </div>
                        )}
                      </td>

                    </tr>

                  ));

                })

              ) : (

                <tr>
                  <td colSpan="9">No products found</td>
                </tr>

              )}

            </tbody>

          </table>

        </div>
      )}

    </div>
  );
}

export default AdminProducts;
