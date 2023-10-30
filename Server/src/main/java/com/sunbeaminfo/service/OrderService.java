package com.sunbeaminfo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.sunbeaminfo.entities.Orders;

@Service
public interface OrderService {
Orders createOrder(Orders order);
List<Orders> getAllOrders() ;
Orders getOrderById(Long id);
boolean deleteOrder(Long id);
boolean updateOrder(Long id, Orders order);
boolean orderFromCart(Long userId, Long userPaymentId, Long addressId);
boolean productOrder(Long userId, Long userPaymentId, Long addressId,Long productId,Integer quantity, String mode);
List<Orders> getOrdersByUserId(Long userId);
}