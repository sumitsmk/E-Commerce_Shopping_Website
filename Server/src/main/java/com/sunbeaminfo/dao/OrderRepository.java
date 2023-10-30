package com.sunbeaminfo.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sunbeaminfo.entities.Orders;
import com.sunbeaminfo.entities.User;


public interface OrderRepository extends JpaRepository<Orders, Long> {

    List<Orders> findByUser(User user);
}