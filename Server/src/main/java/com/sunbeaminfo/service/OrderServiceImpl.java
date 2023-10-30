package com.sunbeaminfo.service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sunbeaminfo.dao.AddressRepository;
import com.sunbeaminfo.dao.CartRepository;
import com.sunbeaminfo.dao.OrderRepository;
import com.sunbeaminfo.dao.PaymentDetailsRepository;
import com.sunbeaminfo.dao.PaymentRepository;
import com.sunbeaminfo.dao.ProductsRepository;
import com.sunbeaminfo.dao.UserRepository;
import com.sunbeaminfo.entities.Address;
import com.sunbeaminfo.entities.Cart;
import com.sunbeaminfo.entities.CartProducts;
import com.sunbeaminfo.entities.OrderedProducts;
import com.sunbeaminfo.entities.Orders;
import com.sunbeaminfo.entities.Payments;
import com.sunbeaminfo.entities.Products;
import com.sunbeaminfo.entities.User;
import com.sunbeaminfo.entities.UserPaymentDetails;
import com.sunbeaminfo.enums.Category;
import com.sunbeaminfo.enums.Mode;


@Service
public class OrderServiceImpl implements OrderService{

private final OrderRepository orderRepository;

private final UserRepository userRepository;

private final PaymentRepository paymentRepository;

private final PaymentDetailsRepository paymentDetailsRepository;

private final AddressRepository addressRepository;

private final CartRepository cartRepository;

private final ProductsRepository productsRepository;

public OrderServiceImpl(OrderRepository orderRepository, PaymentDetailsRepository paymentDetailsRepository, UserRepository userRepository, PaymentRepository paymentRepository, AddressRepository addressRepository, CartRepository cartRepository,ProductsRepository productsRepository) {
    this.orderRepository = orderRepository;
    this.userRepository = userRepository;
    this.paymentRepository = paymentRepository;
    this.addressRepository = addressRepository;
    this.cartRepository= cartRepository;
    this.productsRepository=productsRepository;
    this.paymentDetailsRepository=paymentDetailsRepository;
}

@Override
public Orders createOrder(Orders order) {
return orderRepository.save(order);
}

@Override
public List<Orders> getAllOrders() {
List<Orders> list = orderRepository.findAll();
return list;
}

@Override
public Orders getOrderById(Long id) {

return orderRepository.getById(id);
}

@Override
public boolean deleteOrder(Long id) {
orderRepository.deleteById(id);
return true;
}

@Override
public boolean updateOrder(Long id, Orders order) {
      Optional<Orders> temp=orderRepository.findById(id);
      Orders updatedOrder = temp.get();
      updatedOrder.setOrderDate(order.getOrderDate());
      updatedOrder.setAddress(order.getAddress());
      updatedOrder.setUserQueries(order.getUserQueries());
      updatedOrder.setPayments(order.getPayments());
return true;
}



@Transactional
@Override
public boolean orderFromCart(Long userId, Long userPaymentId, Long addressId){
    User user = userRepository.findById(userId).get();
    UserPaymentDetails userPaymentDetails  = paymentDetailsRepository.findById(userPaymentId).get();
    Cart cart = user.getCart();
    List<OrderedProducts> orderedProductsList = new ArrayList<>();
    Set<CartProducts> cartProducts = cart.getProductsList();
    Iterator<CartProducts> iterator = cartProducts.iterator();
    double total = 0;
    Orders order = new Orders();
    while (iterator.hasNext()) {
        CartProducts cartProduct = iterator.next();
        OrderedProducts orderedProducts = new OrderedProducts();
        orderedProducts.setPrice(cartProduct.getPrice());
        orderedProducts.setProduct(cartProduct.getProduct());
        orderedProducts.setQuantity(cartProduct.getQuantity());
        orderedProducts.setOrder(order);
        orderedProductsList.add(orderedProducts);
        total = total +cartProduct.getPrice();
    }
    
    order.setOrderedProductsList(orderedProductsList);
    order.setUser(user);
    order.setOrderDate(Date.from(Instant.now()));
    // Payments payments = paymentRepository.findById(userPaymentId).get();

    Payments payments = new Payments();
    payments.setMode(Mode.valueOf("UPI"));
    payments.setOrder(null);
    payments.setOrder(order);
    payments.setPaymentStatus(true);
    payments.setTimeStamp(Date.from(Instant.now()));
    payments.setTotalAmmount(total);
    payments.setUser(user);
    payments.setUserPaymentDetails(userPaymentDetails);


    
    Address address = addressRepository.findById(addressId).get();
    order.setUser(user);
    order.setAddress(address);
    order.setOrderStatus(true);
    order.setOrderTotal(total);
    order.setPayments(payments);
    orderRepository.save(order);
    cart.getProductsList().removeAll(cartProducts);
    cart.setTotalAmmount(0);
    cartRepository.save(cart);
    return true;
}

@Transactional
@Override
public boolean productOrder(Long userId, Long userPaymentId, Long addressId,Long productId,Integer quantity,String mode){
    User user = userRepository.findById(userId).get();
    Products product = productsRepository.findById(productId).get();
    Orders order = new Orders();
    // Payments payments = paymentRepository.findByUser(user).get();
    UserPaymentDetails paymentsDetails = paymentDetailsRepository.findById(userPaymentId).get();
    
    Payments payments = new Payments();
    payments.setMode(Mode.valueOf(mode));
    payments.setOrder(null);
    payments.setOrder(order);
    payments.setPaymentStatus(true);
    payments.setTimeStamp(Date.from(Instant.now()));
    payments.setTotalAmmount(quantity*product.getPrice());
    payments.setUser(user);
    payments.setUserPaymentDetails(paymentsDetails);
    Address address = addressRepository.findById(addressId).get();
    List<OrderedProducts> orderedProductsList = new ArrayList<>();
    OrderedProducts orderedProducts = new OrderedProducts();
    orderedProducts.setProduct(product);
    orderedProducts.setOrder(order);
    orderedProducts.setPrice(product.getPrice());
    orderedProducts.setQuantity(quantity);
    orderedProductsList.add(orderedProducts);
    order.setOrderedProductsList(orderedProductsList);
    order.setUser(user);
    order.setAddress(address);
    order.setOrderStatus(true);
    order.setOrderTotal(quantity*product.getPrice());
    order.setPayments(payments);
    order.setOrderDate(Date.from(Instant.now()));
    orderRepository.save(order);
    return true;
}


public List<Orders> getOrdersByUserId(Long userId) {
    User user = userRepository.findById(userId).get();

    List<Orders> list = orderRepository.findByUser(user);
return list;
} 

}
