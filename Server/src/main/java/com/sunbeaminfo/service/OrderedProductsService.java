package com.sunbeaminfo.service;

import com.sunbeaminfo.entities.OrderedProducts;
import com.sunbeaminfo.entities.Orders;
import com.sunbeaminfo.dao.OrderRepository;
import com.sunbeaminfo.dao.OrderedProductsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.sunbeaminfo.DTO.OrderedProductDTO;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

@Transactional
@Service
public class OrderedProductsService {

    private final OrderedProductsRepository orderedProductsRepository;

    private final OrderRepository orderRepository;

    @Autowired
    public OrderedProductsService(OrderedProductsRepository orderedProductsRepository, OrderRepository orderRepository) {
        this.orderedProductsRepository = orderedProductsRepository;
        this.orderRepository = orderRepository;
    }

    public List<OrderedProducts> getAllOrderedProducts() {
        return orderedProductsRepository.findAll();
    }

    public OrderedProducts getOrderedProductById(Long id) {
        Optional<OrderedProducts> orderedProduct = orderedProductsRepository.findById(id);
        return orderedProduct.orElse(null);
    }

    public OrderedProducts createOrderedProduct(OrderedProducts orderedProduct) {
        return orderedProductsRepository.save(orderedProduct);
    }

    public OrderedProducts updateOrderedProduct(Long id, OrderedProducts orderedProduct) {
        if (orderedProductsRepository.existsById(id)) {
            orderedProduct.setId(id);
            return orderedProductsRepository.save(orderedProduct);
        }
        return null;
    }

    public void deleteOrderedProduct(Long id) {
        orderedProductsRepository.deleteById(id);
    }

    @Transactional
    public List<OrderedProductDTO> getAllOrderedProductsByOrderId(Long orderId){
        Orders order = orderRepository.findById(orderId).get();
        List<OrderedProducts> list = orderedProductsRepository.findByOrder(order);
        List<OrderedProductDTO> productList = new ArrayList<>();
        for( OrderedProducts product : list ){
            OrderedProductDTO orderedProductDTO = new OrderedProductDTO();
            orderedProductDTO.setPrice(product.getPrice());
            orderedProductDTO.setProduct(product.getProduct());
            orderedProductDTO.setQuantity(product.getQuantity());
            orderedProductDTO.setTimeStamp(product.getTimeStamp());
            productList.add(orderedProductDTO);
        }
        return productList;
    }
}
