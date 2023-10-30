package com.sunbeaminfo.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sunbeaminfo.entities.OrderedProducts;
import com.sunbeaminfo.entities.Orders;

import java.util.List;


public interface OrderedProductsRepository extends JpaRepository<OrderedProducts, Long> {

    List<OrderedProducts> findByOrder(Orders order);
        
}
