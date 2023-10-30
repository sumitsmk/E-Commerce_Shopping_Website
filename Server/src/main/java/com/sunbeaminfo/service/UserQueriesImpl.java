package com.sunbeaminfo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sunbeaminfo.dao.OrderRepository;
import com.sunbeaminfo.dao.UserQueriesRepository;
import com.sunbeaminfo.dao.UserRepository;
import com.sunbeaminfo.entities.Orders;
import com.sunbeaminfo.entities.User;
import com.sunbeaminfo.entities.UserQueries;

@Service
@Transactional
public class UserQueriesImpl implements UserQueriesService{

@Autowired
    private UserQueriesRepository userQueriesRepository;

@Autowired
    private OrderRepository orderRepository;

@Autowired
    private UserRepository userRepository;

@Override
public UserQueries createUserQueries(UserQueries query , Long userId,Long orderId) {
 
  User user = userRepository.findById(userId).get();
  query.setUser(user);
  Orders order = orderRepository.findById(orderId).get();
  query.setOrders(order);
  userQueriesRepository.save(query);
  List<UserQueries> userQueriesList = user.getUserQueriesList();
userQueriesList.add(query);
userRepository.save(user);
return query;
}

@Override
public List<UserQueries> getAllUserQueriesByUserId(Long userId) {
        User user = userRepository.findById(userId).get();
return user.getUserQueriesList();
}

@Override
public UserQueries getUserQueriesById(Long queryId) {
return userQueriesRepository.getById(queryId);
}

@Override
public boolean deleteUserQueriesById(Long queryId,Long userId) {
User user = userRepository.findById(userId).get();
  List<UserQueries> userQueriesList = user.getUserQueriesList();
  UserQueries query = userQueriesRepository.getById(queryId);
  userQueriesRepository.delete(query);
  userQueriesList.remove(query);
  userRepository.save(user);
return true;
}

@Override
public boolean  updateUserQueriesById(Long userId,Long queryId ,UserQueries updatedQuery) {
User user = userRepository.findById(userId).get();
  List<UserQueries> userQueriesList = user.getUserQueriesList();
  UserQueries query = userQueriesRepository.getById(queryId);
  query.setDescription(updatedQuery.getDescription());
  query.setSubject(updatedQuery.getSubject());
  userQueriesRepository.save(query);
  return true;
}

}
