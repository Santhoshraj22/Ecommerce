import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { FaSearch } from "react-icons/fa"; 
import "react-toastify/dist/ReactToastify.css";
import "./Content.css";

const Content = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]); 
  const [searchTerm, setSearchTerm] = useState(""); 
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [loading, setLoading] = useState(true);
  const [showScrollToTop, setShowScrollToTop] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data); 
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    const isProductInCart = cart.some((item) => item.id === product.id);
    if (isProductInCart) {
      toast.warn("Item is already in the cart!");
    } else {
      const updatedCart = [...cart, product];
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      toast.success("Item added successfully!");
    }
  };

  const handleViewCart = () => {
    navigate("/cart");
  };

 
  const handleScroll = () => {
    if (window.scrollY > 300) {
      setShowScrollToTop(true); 
    } else {
      setShowScrollToTop(false); 
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" }); 
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll); 
    return () => window.removeEventListener("scroll", handleScroll); 
  }, []);

 
  useEffect(() => {
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  return (
    <div className="content-container">
      <h1 className="content-title">E-Commerce Store</h1>

   
      <div className="search-bar-container">
        <input
          type="text"
          className="search-bar"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
        
      </div>

      {loading ? (
        <div className="spinner-container">
          <ClipLoader size={50} color={"#ff9800"} loading={loading} />
        </div>
      ) : (
        <div className="product-list">
          {filteredProducts.map((product) => (
            <div className="product-card" key={product.id}>
              <img
                src={product.image}
                alt={product.title}
                className="product-image fade-in"
                loading="lazy"
              />
              <h2 className="product-name">{product.title}</h2>
              <p className="product-price">${product.price.toFixed(2)}</p>
              <button
                className="add-to-cart-btn"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}

     
      {showScrollToTop && (
        <button className="scroll-to-top-btn" onClick={scrollToTop}>
          ↑
        </button>
      )}
    </div>
  );
};

export default Content;
