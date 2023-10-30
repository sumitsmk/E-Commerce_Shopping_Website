import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { constants } from '../../utils/constants'
import { Link,useNavigate } from 'react-router-dom';
import CategoryBar from '../categorybar';
import { getProductCategoryList } from '../../services/product';

function Books() {
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const productType = "Books";

  useEffect(() => {
    loadProducts();
  }, [])

  const loadProducts = async () => {
    const response = await getProductCategoryList(productType)  
    setProducts(response)
  }

  return (
    <>
   <CategoryBar />
    <div className='container' style={{position:"relative",minHeight:"100%" ,margin:"0"}}>
    <div className=''>
<br/>

      <h1 style={{ textAlign: 'center', margin: 10 }}>Book Store</h1>
      <div className='row' style={{ marginTop: 50}}>
        {products.map((product) => {
          return (
            <div className='col-md-3'>
              <div className='card'>
              <img  src={`http://localhost:8000/images/${product.productImage}`}  style={{ height: 300 }} alt="userimage"/>
                <div className='card-body'>
                  <h5 className='card-title'> 
                    
                    <Link to={`/item/${product.id}`}>
                      {/* {product['title']} */}
                      {product['name']}
                    </Link>
                    </h5>
                  <div className='card-text'>
                    <div>{product['company']}</div>
                    <div>₹ {product['price']}</div>                   
                  </div>
                </div>
              </div><br/>
            </div>
          )
        })}
      </div>
      </div>
    </div>
    </>
  )
}

export default Books
