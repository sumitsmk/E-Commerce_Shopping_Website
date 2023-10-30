package com.sunbeaminfo.ExceptionHandler.ExceptionHandlerResponse;

import org.springframework.http.HttpStatus;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserNotFoundExceptionDTO {
    private final String message;
    private final Throwable throwable;
    private final HttpStatus httpStatus;    
}
