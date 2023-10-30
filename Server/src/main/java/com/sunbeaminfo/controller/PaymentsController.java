package com.sunbeaminfo.controller;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import com.sunbeaminfo.entities.Payments;
import com.sunbeaminfo.service.PaymentService;
import com.nimbusds.jose.shaded.json.JSONObject;
import com.razorpay.*;

@RestController
@RequestMapping("/api/payments")
public class PaymentsController {

    @Autowired
    private PaymentService paymentsService;

 @PostMapping("/pay")
    public String finalPayment(@RequestParam("amt") String s) throws RazorpayException {
        double amount = Double.parseDouble(s);
        System.out.println("amt : "+amount);
        RazorpayClient  razorpay =  new RazorpayClient("rzp_test_z7JhiLJcnUGB2J", "thVnLjWZN0IZmX7j6yCbQuX2");
        org.json.JSONObject ob = new org.json.JSONObject();
        ob.put("amount", amount*100);
        ob.put("currency","INR");
        ob.put("receipt","txn_344220005");
        Order order = razorpay.orders.create(ob);
        System.out.println("order: "+order);
        System.out.println("order: "+order);
        System.out.println("order: "+order);
        System.out.println("order: "+order);
        // return ResponseEntity.status(HttpStatus.OK).body(order);
        return order.toString();
    }

    @PostMapping
    public Payments createPayment(@RequestBody Payments payment) {
        return paymentsService.createPayment(payment);
    }

    @GetMapping("/{id}")
    public Payments getPayment(@PathVariable Long id) {
        return paymentsService.getPaymentById(id);
    }

    @GetMapping
    public List<Payments> getAllPayments() {
        return paymentsService.getAllPayments();
    }

    @PutMapping("/{id}")
    public Payments updatePayment(@PathVariable Long id, @RequestBody Payments payment) {
        return paymentsService.updatePayment(id, payment);
    }

    @DeleteMapping("/{id}")
    public void deletePayment(@PathVariable Long id) {
        paymentsService.deletePayment(id);
    }
}
