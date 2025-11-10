
// we first define the Products and their types
// they must match the response from the API
type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

// the getProducts function fetches from the fake API store products
async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch('https://fakestoreapi.com/products');
    if (!res.ok) {
      throw new Error('Failed to fetch products from API');
    }
    const data: Product[] = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  // this return will return an empty array on error
    return [];
  }
}

//the async server component is used to fetch the data on the server
// this is done before rendering the page
export default async function ProductPage() {
  const productList = await getProducts();

  const styles = `
    .table-container {
      margin-bottom: 40px;
      overflow-x: auto;
    }
    table {
      width: 100%;
      border-collapse: collapse;
    }
    th, td { 
      border: 1px solid #ddd; 
      padding: 8px; 
      text-align: left; 
      vertical-align: middle;
    }
    th { 
      background-color: #f2f2f2; 
    }
    td img { 
      max-width: 50px; 
      height: auto; 
      display: block;
      margin: auto;
    }
    
    .card-container {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      justify-content: center;
      padding: 20px 0;
    }
    .card {
      border: 1px solid #ccc;
      border-radius: 8px;
      padding: 16px;
      width: 280px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .card img {
      width: 100%;
      height: 220px;
      object-fit: contain;
      margin-bottom: 12px;
    }
    .card h3 { 
      font-size: 1.1rem; 
      margin-bottom: 8px; 
      text-align: center;
      /* Clamp text to 2 lines */
      height: 2.6em; 
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .card p { 
      margin: 4px 0; 
      color: #555; 
      font-size: 0.9rem;
    }
    .card .price { 
      font-weight: bold; 
      color: #000; 
      font-size: 1.25rem; 
      margin-top: 8px;
    }
    .card .rating { 
      color: #e67e22; 
      font-weight: 500;
    }
  `;
// we will inject the styles directly
  return (
    <div>
      <style>{styles}</style>

      <h1>Product Showcase</h1>

      <h2>Product Table</h2>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Image</th>
              <th>Title</th>
              <th>Category</th>
              <th>Price</th>
              <th>Rating</th>
              <th>Stock (Count)</th>
            </tr>
          </thead>
          <tbody>
            {productList.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>
                  <img src={product.image} alt={product.title} />
                </td>
                <td>{product.title}</td>
                <td>{product.category}</td>
                <td>${product.price.toFixed(2)}</td>
                <td>{product.rating.rate} ★</td>
                <td>{product.rating.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <hr />
      <h2>Product Cards</h2>
      <div className="card-container">
        {productList.map((product) => (
          <div key={product.id} className="card">
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p>{product.category}</p>
            <p className="price">${product.price.toFixed(2)}</p>
            <p className="rating">
              {product.rating.rate} ★ ({product.rating.count} reviews)
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}


