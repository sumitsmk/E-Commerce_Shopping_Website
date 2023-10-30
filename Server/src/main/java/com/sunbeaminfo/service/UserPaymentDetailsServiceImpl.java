package com.sunbeaminfo.service;

import com.sunbeaminfo.dao.PaymentDetailsRepository;
import com.sunbeaminfo.dao.UserRepository;
import com.sunbeaminfo.entities.User;
import com.sunbeaminfo.entities.UserPaymentDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

@Service
@Transactional
public class UserPaymentDetailsServiceImpl implements UserPaymentDetailsService {

    private final PaymentDetailsRepository userPaymentDetailsRepository;

    private final UserRepository userRepository;

    @Autowired
    public UserPaymentDetailsServiceImpl(PaymentDetailsRepository userPaymentDetailsRepository, UserRepository userRepository) {
        this.userPaymentDetailsRepository = userPaymentDetailsRepository;
        this.userRepository=userRepository;
    }

    @Override
    public List<UserPaymentDetails> getAllUserPaymentDetails() {
        return userPaymentDetailsRepository.findAll();
    }

    @Override
    public UserPaymentDetails getUserPaymentDetailsById(Long id) {
        Optional<UserPaymentDetails> optionalPaymentDetails = userPaymentDetailsRepository.findById(id);
        return optionalPaymentDetails.orElse(null);
    }

    @Override
    @Transactional
    public UserPaymentDetails createUserPaymentDetails(UserPaymentDetails paymentDetails, Long userId) {
        User user = userRepository.findById(userId).get();
        user.getPaymentMethodList().add(paymentDetails);
        paymentDetails.setUser(user);
        // userRepository.save(user);
        return userPaymentDetailsRepository.save(paymentDetails);
    }

    @Override
    public UserPaymentDetails updateUserPaymentDetails(Long id, UserPaymentDetails paymentDetails) {
        if (userPaymentDetailsRepository.existsById(id)) {
            paymentDetails.setId(id);
            return userPaymentDetailsRepository.save(paymentDetails);
        }
        return null; // Handle error appropriately
    }

    @Override
    public void deleteUserPaymentDetails(Long id) {
        userPaymentDetailsRepository.deleteById(id);
    }
}
