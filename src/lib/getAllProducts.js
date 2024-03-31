export default async function getProducts() {
    const result = await fetch("http://localhost:3000/api/products",{
        cache:"no-cache"
    });
    return result.json();
}
