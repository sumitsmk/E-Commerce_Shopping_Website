package com.sunbeaminfo.dao;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.*;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class ApiResponse {
    
    private String Message;
    private boolean success;
//     private UsersDto user;
    private String token;

     public ApiResponse(String Message, boolean success){
          this.Message=Message;
          this.success=success;
    }

//     public ApiResponse(String token, boolean success,UsersDto user, String Message){
//           this.token=token;
//           this.Message=Message;
//           this.success=success;
//           this.user=user;
//     }
}
