package com.sunbeaminfo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sunbeaminfo.DTO.ChangePassDTO;
import com.sunbeaminfo.DTO.LoginResponceDTO;
import com.sunbeaminfo.DTO.RegistrationDTO;
import com.sunbeaminfo.DTO.RegistrationResponseDTO;
import com.sunbeaminfo.service.AuthenticationService;

@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
public class AuthenticationController {

    @Autowired
    private AuthenticationService authenticationService;

    @PostMapping("/register")
    public RegistrationResponseDTO registerUser(@RequestBody RegistrationDTO body){
        return authenticationService.registerUser(body);
    }

     @PostMapping("/changepass")
    public boolean changePassword(@RequestBody ChangePassDTO body){
        return authenticationService.changePasswrd(body.getEmail(),body.getPassword());
    }
    
    @PostMapping("/login")
    public LoginResponceDTO loginUser(@RequestBody RegistrationDTO body){
        return authenticationService.loginUser(body.getEmail(), body.getPassword());
    }
}   
