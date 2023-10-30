package com.sunbeaminfo.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;

import com.sunbeaminfo.dao.ProductsRepository;
import com.sunbeaminfo.entities.Products;
import com.sunbeaminfo.enums.Category;

@Service
public class ProductsServiceImpl implements ProductsService {

    private final ProductsRepository productsRepository;

    public ProductsServiceImpl(ProductsRepository productsRepository) {
        this.productsRepository = productsRepository;
    }

    @Override
    public List<Products> getAllProducts() {
        return productsRepository.findAll();
    }

    @Override
    public Optional<Products> getProductById(Long id) {
        return productsRepository.findById(id);
    }

    @Override
    public Products createProduct(Products product) {
        return productsRepository.save(product);
    }

    @Override
    public Products updateProduct(Long id, Products updatedProduct) {
        updatedProduct.setId(id);
        return productsRepository.save(updatedProduct);
    }

    @Override
    public void deleteProduct(Long id) {
        productsRepository.deleteById(id);
    }

    @Override
    public List<Products> getProductsByCategory(String categorieString){
        Category category = Category.valueOf(categorieString);
        return productsRepository.findByCategory(category);
    }

    public List<String> searchProductsByName(String name){
        List<String>searchedname = new ArrayList<>(); 
        List<Products>list= productsRepository.findByProductNameContainingIgnoreCase(name);
    for(Products p : list){
        searchedname.add(p.getProductName());
    }
    return searchedname;
        }
}

