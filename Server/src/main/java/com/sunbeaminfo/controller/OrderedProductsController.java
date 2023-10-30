package com.sunbeaminfo.controller;

import com.sunbeaminfo.DTO.OrderedProductDTO;
import com.sunbeaminfo.entities.OrderedProducts;
import com.sunbeaminfo.service.OrderedProductsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import javax.transaction.Transactional;

@RestController
@Transactional
@RequestMapping("/ordered-products")
public class OrderedProductsController {

    private final OrderedProductsService orderedProductsService;

    @Autowired
    public OrderedProductsController(OrderedProductsService orderedProductsService) {
        this.orderedProductsService = orderedProductsService;
    }

    @GetMapping
    public ResponseEntity<List<OrderedProducts>> getAllOrderedProducts() {
        List<OrderedProducts> orderedProducts = orderedProductsService.getAllOrderedProducts();
        return ResponseEntity.ok(orderedProducts);
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderedProducts> getOrderedProductById(@PathVariable Long id) {
        OrderedProducts orderedProduct = orderedProductsService.getOrderedProductById(id);
        return ResponseEntity.ok(orderedProduct);
    }

    @Transactional
    @GetMapping("/order/{orderId}")
    public ResponseEntity<List<OrderedProductDTO>> getOrderedProductByOrder(@PathVariable Long orderId) {
        List<OrderedProductDTO> orderedProduct = orderedProductsService.getAllOrderedProductsByOrderId(orderId);
        return ResponseEntity.ok(orderedProduct);
    }

    @PostMapping
    public ResponseEntity<OrderedProducts> createOrderedProduct(@RequestBody OrderedProducts orderedProduct) {
        OrderedProducts createdOrderedProduct = orderedProductsService.createOrderedProduct(orderedProduct);
        return ResponseEntity.ok(createdOrderedProduct);
    }

    @PutMapping("/{id}")
    public ResponseEntity<OrderedProducts> updateOrderedProduct(
            @PathVariable Long id, @RequestBody OrderedProducts orderedProduct) {
        OrderedProducts updatedOrderedProduct = orderedProductsService.updateOrderedProduct(id, orderedProduct);
        return ResponseEntity.ok(updatedOrderedProduct);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrderedProduct(@PathVariable Long id) {
        orderedProductsService.deleteOrderedProduct(id);
        return ResponseEntity.noContent().build();
    }
}
