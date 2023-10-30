import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getProductList } from "../services/product";
import CategoryBar from "./categorybar";
import { test } from './navigationBar';
import "./product-gallery.css";

const Card = ({
  id,
  company,
  category,
  productName,
  price,
  productDescription,
  productImage,
}) => {
  const navigate = useNavigate();
  
  return (
    <div
      className="card col-md-3 m-1"
      style={{ width: "300px", height: "420px" }}
    >
      <img
        src={`http://localhost:8000/images/${productImage}`}
        alt="productimage"
        className="card-img-top p-3"
        style={{ maxHeight: "250px", cursor: "pointer" }}
        onClick={() => navigate(`/item/${id}`)}
      />
      <div className="card-body">
        <h5 className="card-title">{company}</h5>
        <Link to={`/item/${id}`} className="ptitle">
          <h5 className="card-title">{productName}
          </h5>
        </Link>
        <h6 className="card-subtitle mb-2 text-muted">{category}</h6>
        <h6 className="card-subtitle mb-2 text-muted">₹ {price}</h6>
      </div>
    </div>
  );
};

function ProductGallery() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [test1, setTest1] = useState("");
  
  useEffect(() => {
    loadProducts();
    setInterval(() => {
      setTest1(test);
    }, 100);
  }, []);

  const loadProducts = async () => {
    const response = await getProductList();
    setProducts(response);
  };

  return (
    <>
      {/* <NavigationBar /> */}
      <CategoryBar />
      <div style={{ position: "relative", minHeight: "100%", margin: "0" }}>
        <div className="">
          <div
            id="carouselExampleIndicators"
            style={{ height: "300px", paddingTop: "10px" }}
            className="carousel slide"
            data-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  className="d-block w-100"
                  src="https://ik.imagekit.io/major/images/NewAd1.png?updatedAt=1693155358690"
                  alt="First slide"
                ></img>
              </div>
              <div className="carousel-item">
                <img
                  className="d-block w-100"
                  src="https://ik.imagekit.io/major/images/NewAd2.png?updatedAt=1693155358604"
                  alt="Second slide"
                ></img>
              </div>
              <div className="carousel-item">
                <img
                  className="d-block w-100"
                  src="https://ik.imagekit.io/major/images/NewAd3.png?updatedAt=1693155358598"
                  alt="Third slide"
                ></img>
              </div>
            </div>
            <a
              className="carousel-control-prev"
              href="#carouselExampleIndicators"
              role="button"
              data-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="sr-only">Previous</span>
            </a>
            <a
              className="carousel-control-next"
              href="#carouselExampleIndicators"
              role="button"
              data-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="sr-only">Next</span>
            </a>
          </div>

          <h1 style={{ textAlign: "center", margin: 10 }}>Product Gallery</h1>

          <section className="d-flex flex-wrap justify-content-center">
            {products.filter((q)=>q.productName.toLowerCase().includes(test1.toLowerCase())).map((product) => {
              return <Card key={product.id} {...product} />;
            })}
          </section>
        </div>
      </div>
    </>
  );
}

export default ProductGallery;
