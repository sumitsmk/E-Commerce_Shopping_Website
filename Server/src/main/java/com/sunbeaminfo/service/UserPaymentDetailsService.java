package com.sunbeaminfo.service;

import com.sunbeaminfo.entities.UserPaymentDetails;

import java.util.List;

public interface UserPaymentDetailsService {

    List<UserPaymentDetails> getAllUserPaymentDetails();

    UserPaymentDetails getUserPaymentDetailsById(Long id);

    UserPaymentDetails createUserPaymentDetails(UserPaymentDetails paymentDetails, Long userId);

    UserPaymentDetails updateUserPaymentDetails(Long id, UserPaymentDetails paymentDetails);

    void deleteUserPaymentDetails(Long id);
}
