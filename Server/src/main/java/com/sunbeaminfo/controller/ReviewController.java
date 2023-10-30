package com.sunbeaminfo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sunbeaminfo.DTO.ReviewDTO;
import com.sunbeaminfo.service.ReviewServiceImpl;

@RestController
@RequestMapping("/review")
public class ReviewController {

    @Autowired
    private ReviewServiceImpl reviewServiceImpl;

    @PostMapping("/{userId}/{orderedProductId}")
    public ResponseEntity<?> addReview(@PathVariable Long userId, @PathVariable Long orderedProductId,@RequestBody ReviewDTO body){
        reviewServiceImpl.createReview(body, userId, orderedProductId);
        return ResponseEntity.ok("created");
    }
   
    @DeleteMapping("/{userId}/{reviewId}")
    public ResponseEntity<?> addReview(@PathVariable Long userId, @PathVariable Long reviewId){
        reviewServiceImpl.deleteReview(reviewId, userId);
        return ResponseEntity.ok("created");
    }
   
}
