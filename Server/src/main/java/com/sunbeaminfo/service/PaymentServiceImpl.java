package com.sunbeaminfo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sunbeaminfo.dao.PaymentRepository;
import com.sunbeaminfo.entities.Payments;

@Service
public class PaymentServiceImpl implements PaymentService {
    @Autowired
    private PaymentRepository paymentsRepository;

    @Override
    public Payments createPayment(Payments payment) {
        return paymentsRepository.save(payment);
    }

    @Override
    public Payments getPaymentById(Long id) {
        return paymentsRepository.findById(id).orElse(null);
    }

    @Override
    public List<Payments> getAllPayments() {
        return paymentsRepository.findAll();
    }

    @Override
    public Payments updatePayment(Long id, Payments payment) {
        if (paymentsRepository.existsById(id)) {
            payment.setId(id);
            return paymentsRepository.save(payment);
        }
        return null; // Handle not found scenario
    }

    @Override
    public void deletePayment(Long id) {
        paymentsRepository.deleteById(id);
    }

}
