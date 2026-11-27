
const API_URL = import.meta.env.VITE_API || "http://localhost:8080";

export async function getProducts() {
    try {
        const response = await fetch(`${API_URL}/products`);

        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }

        return await response.json();

    } catch (error) {
        console.error("Product Fetch Error:", error);
        throw error;
    }
}
