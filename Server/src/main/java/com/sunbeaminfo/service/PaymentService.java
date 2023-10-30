package com.sunbeaminfo.service;

import java.util.List;

import com.sunbeaminfo.entities.Payments;

public interface PaymentService {
    Payments createPayment(Payments payment);
    Payments getPaymentById(Long id);
    List<Payments> getAllPayments();
    Payments updatePayment(Long id, Payments payment);
    void deletePayment(Long id);
}
