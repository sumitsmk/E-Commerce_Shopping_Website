package com.sunbeaminfo.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sunbeaminfo.entities.Review;

public interface ReviewRepository extends JpaRepository<Review, Long>{
    
}
