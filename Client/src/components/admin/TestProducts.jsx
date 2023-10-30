import React, { useState } from 'react';
import axios from 'axios';
import { createUrl, log } from "../../utils/utils";

function ProductForm() {
  const [product, setProduct] = useState({
    productName: '',
    productPrice: '',
    productUnitstock: '',
    productDescription: '',
    productCompany: '',
    productCategory: '',
  });
  const [image, setImage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("jwt");

    const formData = new FormData();
    formData.append('data', JSON.stringify(product));
    formData.append('image', image);
    
    const url = createUrl(`/admin/products`);
    try {
      const response = await axios.post(url, formData, {
        headers: {
           Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      
      console.log('Product created:', response.data);
      // Reset the form or show a success message
      setProduct({
        productName: '',
        productPrice: '',
        productUnitstock: '',
        productDescription: '',
        productCompany: '',
        productCategory: '',
      }); // Clear the form fields
      setImage(null); // Clear the image selection
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  return (
    <div>
      <h2>Add a New Product</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label htmlFor="productName">Product Name:</label>
          <input
            type="text"
            id="productName"
            name="productName"
            value={product.productName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="productPrice">Product Price:</label>
          <input
            type="text"
            id="productPrice"
            name="productPrice"
            value={product.productPrice}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="productUnitstock">Unit in Stock:</label>
          <input
            type="text"
            id="productUnitstock"
            name="productUnitstock"
            value={product.productUnitstock}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="productDescription">Description:</label>
          <textarea
            id="productDescription"
            name="productDescription"
            value={product.productDescription}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="productCompany">Company:</label>
          <input
            type="text"
            id="productCompany"
            name="productCompany"
            value={product.productCompany}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="productCategory">Category:</label>
          <input
            type="text"
            id="productCategory"
            name="productCategory"
            value={product.productCategory}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="image">Image:</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </div>
        <button type="submit">Create Product</button>
      </form>
    </div>
  );
}

export default ProductForm;
