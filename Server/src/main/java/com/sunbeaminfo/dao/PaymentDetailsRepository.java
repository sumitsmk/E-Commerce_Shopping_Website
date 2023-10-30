package com.sunbeaminfo.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sunbeaminfo.entities.UserPaymentDetails;

public interface PaymentDetailsRepository extends JpaRepository<UserPaymentDetails, Long> {
    
}
