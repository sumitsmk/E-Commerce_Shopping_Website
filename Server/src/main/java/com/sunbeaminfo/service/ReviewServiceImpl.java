package com.sunbeaminfo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sunbeaminfo.DTO.ReviewDTO;
import com.sunbeaminfo.dao.OrderedProductsRepository;
import com.sunbeaminfo.dao.ReviewRepository;
import com.sunbeaminfo.dao.UserRepository;
import com.sunbeaminfo.entities.OrderedProducts;
import com.sunbeaminfo.entities.Review;
import com.sunbeaminfo.entities.User;

@Service
@Transactional
public class ReviewServiceImpl {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OrderedProductsRepository orderedProductsRepository;
   

    public boolean createReview(ReviewDTO body, Long userId, Long orderedProductId){

        OrderedProducts orderedProduct = orderedProductsRepository.findById(orderedProductId).get();
        System.out.println(userId);
        User user = userRepository.findById(userId).get();
        Review review = new Review();
        review.setComment(body.getComment());
        review.setOrderedProduct(orderedProduct);
        review.setRating(body.getRating());
        review.setUser(user);
      //  reviewRepository.save(review);
        List<Review> reviewList = user.getReviewList();
        reviewList.add(review);
        userRepository.save(user);
        return true;
    }
   
    public boolean deleteReview(Long reviewId,Long userId){
        User user = userRepository.findById(userId).get();
        Review review = reviewRepository.getById(reviewId);
        reviewRepository.deleteById(reviewId);
        List<Review> reviewList = user.getReviewList();
        reviewList.remove(review);
        userRepository.save(user);
        return true;
    }
   
   


}
