import axios from "axios";
import React, { useState } from 'react'; 

function Dashboard() {
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState(""); 
    const [id, setId] = useState(""); // ✅ Added id state
    const [status, setStatus] = useState(""); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:9000/addProduct', {
                name,
                quantity,
                price
            });
            setStatus(response.data.message || "Product Added Successfully!");
        } catch (error) {
            setStatus(`Error: ${error.response ? error.response.data.message : error.message}`);
        }
    };

    const handleGet = async () => {
        try {
            const result = await axios.get(`http://localhost:9000/getProduct/${id.trim()}`); //✅ Changed 8000 -> 9000
            console.log(result.data);
            setStatus(JSON.stringify(result.data));
        } catch (err) {
            setStatus("Failed to fetch product");
            console.error(err);
        }
    };
    
    const handleUpdate = async () => {
        try {
            const result = await axios.put(`http://localhost:9000/updateProduct/${id.trim()}`, {
                name,
                quantity,
                price
            });
            setStatus(result.data.message || "Product Updated Successfully!");
        } catch (err) {
            setStatus("Failed to update product");
            console.error(err);
        }
    };
    
    const handleDelete = async () => {
        try {
            const result = await axios.delete(`http://localhost:9000/deleteProduct/${id.trim()}`);
            setStatus(result.data.message || "Product Deleted Successfully!");
        } catch (err) {
            setStatus("Failed to delete product");
            console.error(err);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h3>Inventory Management - Dashboard</h3>

                <div>
                    <label>Name</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div>
                    <label>Quantity</label>
                    <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
                </div>
                <div>
                    <label>Price</label>
                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
                </div>
                <div>
                    <label>Product ID</label>
                    <input type="text" value={id} onChange={(e) => setId(e.target.value)} />
                </div>

                <div>
                    <button type="submit" >Register Product</button>{" "}
                    <button type="button"  onClick={handleGet}>Find Product</button>{" "}
                    <button type="button"  onClick={handleUpdate}>Update Product</button>{" "}
                    <button type="button"  onClick={handleDelete}>Delete Product</button>
                </div>

                <div>
                    {status}
                </div>
            </form>
        </div>
    );
}

export default Dashboard;
