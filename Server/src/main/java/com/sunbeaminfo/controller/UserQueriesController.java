package com.sunbeaminfo.controller;

import java.util.ArrayList;
import java.util.List;

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

import com.sunbeaminfo.DTO.CartDTO;
import com.sunbeaminfo.DTO.UserDTO;
import com.sunbeaminfo.DTO.UserQueriesDTO;
import com.sunbeaminfo.entities.User;
import com.sunbeaminfo.entities.UserQueries;
import com.sunbeaminfo.service.UserQueriesService;

@RestController
@RequestMapping("/query/")
public class UserQueriesController {
@Autowired
    private final UserQueriesService customerService;

public UserQueriesController(UserQueriesService customerService) {
this.customerService = customerService;
}

@PostMapping("add/{userId}/{orderId}")
public ResponseEntity<String> createCustomer(@RequestBody UserQueries customer,@PathVariable Long userId,@PathVariable Long orderId) {
   UserQueries createUserQueries = customerService.createUserQueries(customer, userId,orderId);
        return ResponseEntity.status(HttpStatus.CREATED).body("Successfully Query Created with ID: " + createUserQueries.getId());
}

@GetMapping("get/{queryId}")  //Lazy Initialization error
public ResponseEntity<UserQueriesDTO> getCustomer(@PathVariable Long queryId) {
   UserQueries createUserQueries = customerService.getUserQueriesById(queryId);
   UserQueriesDTO query= new UserQueriesDTO();
   query.setDescription(createUserQueries.getDescription());
   query.setId(createUserQueries.getId());
   query.setOrder_id(createUserQueries.getOrders().getId());
   query.setSubject(createUserQueries.getSubject());
   query.setUser_id(createUserQueries.getUser().getId());
        return ResponseEntity.ok(query);
}

@DeleteMapping("delete/{queryId}/{userId}")
public boolean deleteQuery(@PathVariable Long queryId,@PathVariable Long userId) {
return customerService.deleteUserQueriesById(queryId, userId);
}

@GetMapping("getAllQueries/{userId}")  //Lazy Initialization error
public ResponseEntity<List<UserQueriesDTO>> getAllQueries(@PathVariable Long userId) {
   List<UserQueries> allUserQueriesByUserId = customerService.getAllUserQueriesByUserId(userId);
   List<UserQueriesDTO> list = new ArrayList();
   for (UserQueries u : allUserQueriesByUserId) {
UserQueriesDTO user = new UserQueriesDTO();
user.setDescription(u.getDescription());
user.setId(u.getId());
user.setOrder_id(u.getOrders().getId());
user.setSubject(u.getSubject());
user.setUser_id(u.getUser().getId());
list.add(user);
   }
   return ResponseEntity.ok(list);
}

@PutMapping("update/{userId}/{queryId}")
public boolean updateQuery(@PathVariable Long userId,@PathVariable Long queryId,@RequestBody UserQueries update) {
return customerService.updateUserQueriesById(userId, queryId, update);
}

}