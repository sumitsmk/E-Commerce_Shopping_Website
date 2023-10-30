package com.sunbeaminfo.ExceptionHandler;

import com.sunbeaminfo.ExceptionHandler.ExceptionHandlerResponse.UserNotFoundExceptionDTO;
import com.sunbeaminfo.dao.ApiResponse;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.sunbeaminfo.CustomExceptions.ResourceNotFound;
import com.sunbeaminfo.CustomExceptions.UserNotFoundException;

@ControllerAdvice
public class ExceptionHandlers {

    @ExceptionHandler(value={ResourceNotFound.class})  
    public ResponseEntity<?> Resourcenotfound(ResourceNotFound exception){
       String message = exception.getMessage();   
       ApiResponse apiresponse = new ApiResponse(message,false);
       return new ResponseEntity<>(apiresponse,HttpStatus.NOT_FOUND);
    }


//     @ExceptionHandler(value={UserNotFoundException.class})
//     public ResponseEntity<Object> UserNotFoundExceptionHandler(UserNotFoundException userNotFoundException){

//         // UserNotFoundExceptionDTO userNotFoundExceptionHandlerDTO = new UserNotFoundExceptionDTO(userNotFoundException.getMessage(), userNotFoundException.getCause(), HttpStatus.NOT_FOUND);
//             UserNotFoundExceptionDTO userNotFoundExceptionHandlerDTO = new UserNotFoundExceptionDTO(userNotFoundException.getMessage(), userNotFoundException.getCause(), HttpStatus.NOT_FOUND);
//         return new ResponseEntity<>(userNotFoundExceptionHandlerDTO,HttpStatus.NOT_FOUND);
// }

@ExceptionHandler(value = {Exception.class})
public ResponseEntity<Object> ExceptionHandler(Exception exception) {
    HttpStatus httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;

    Map<String, Object> response = new HashMap<>();
    response.put("message", "Server problem!!!!!");
    response.put("status", httpStatus.value());
    response.put("status", httpStatus.name());

    return new ResponseEntity<>(response, httpStatus);
}


}