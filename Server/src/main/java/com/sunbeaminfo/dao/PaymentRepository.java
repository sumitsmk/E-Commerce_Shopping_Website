package com.sunbeaminfo.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sunbeaminfo.entities.Payments;
import com.sunbeaminfo.entities.User;


public interface PaymentRepository extends JpaRepository<Payments, Long> {
    
     Optional<Payments> findByUser(User user);

}
