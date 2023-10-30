package com.sunbeaminfo.controller;

import com.sunbeaminfo.entities.UserPaymentDetails;
import com.sunbeaminfo.service.UserPaymentDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/userPaymentDetails")
public class UserPaymentDetailsController {

    private final UserPaymentDetailsService userPaymentDetailsService;

    @Autowired
    public UserPaymentDetailsController(UserPaymentDetailsService userPaymentDetailsService) {
        this.userPaymentDetailsService = userPaymentDetailsService;
    }

    @GetMapping
    public ResponseEntity<List<UserPaymentDetails>> getAllUserPaymentDetails() {
        List<UserPaymentDetails> paymentDetailsList = userPaymentDetailsService.getAllUserPaymentDetails();
        return ResponseEntity.ok(paymentDetailsList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserPaymentDetails> getUserPaymentDetailsById(@PathVariable Long id) {
        UserPaymentDetails paymentDetails = userPaymentDetailsService.getUserPaymentDetailsById(id);
        return ResponseEntity.ok(paymentDetails);
    }

    @PostMapping("/{userId}")
    public ResponseEntity<UserPaymentDetails> createUserPaymentDetails(@RequestBody UserPaymentDetails paymentDetails, @PathVariable Long userId) {
        UserPaymentDetails createdPaymentDetails = userPaymentDetailsService.createUserPaymentDetails(paymentDetails, userId);
        return ResponseEntity.ok(createdPaymentDetails);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserPaymentDetails> updateUserPaymentDetails(
            @PathVariable Long id, @RequestBody UserPaymentDetails paymentDetails) {
        UserPaymentDetails updatedPaymentDetails = userPaymentDetailsService.updateUserPaymentDetails(id, paymentDetails);
        return ResponseEntity.ok(updatedPaymentDetails);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUserPaymentDetails(@PathVariable Long id) {
        userPaymentDetailsService.deleteUserPaymentDetails(id);
        return ResponseEntity.noContent().build();
    }
}
