import ProductCard from "../components/productcard";

import config from "../config";

function Home() {
  return (
    <div className="container py-5">
      <header className="header">
        <h3 className="text-center mb-3">Home</h3>
      </header>
      {config.products.map((product) => (
        <ProductCard product={product} key={product.Name}></ProductCard>
      ))}
    </div>
  );
}

export default Home;
