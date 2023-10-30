package com.sunbeaminfo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.sunbeaminfo.entities.UserQueries;

@Service
public interface UserQueriesService {
UserQueries createUserQueries(UserQueries query , Long userId,Long orderId);
List<UserQueries> getAllUserQueriesByUserId(Long userId);
UserQueries getUserQueriesById(Long queryId);
boolean deleteUserQueriesById(Long queryId,Long userId);
boolean updateUserQueriesById(Long userId,Long queryId ,UserQueries updatedQuery);
}
