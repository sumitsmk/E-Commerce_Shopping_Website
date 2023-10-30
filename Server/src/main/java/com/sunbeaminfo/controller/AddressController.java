package com.sunbeaminfo.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sunbeaminfo.DTO.AddressDTO;
import com.sunbeaminfo.entities.Address;
import com.sunbeaminfo.service.AddressService;
@RestController
@RequestMapping("/address")
public class AddressController {
   
@Autowired
private AddressService addressService;

public AddressController(AddressService addressService) {
this.addressService = addressService;

}

@PostMapping("/add/uuid/{userId}")
public Address addAddress(@RequestBody Address address, @PathVariable Long userId) {
  System.out.println("-----------------------------Inside Controller");
    System.out.println("-----------------------------Inside Controller");
      System.out.println("-----------------------------Inside Controller");
  return addressService.createAddress(address,userId);
}
@GetMapping("/get")
public List<AddressDTO> getAddresses(@RequestParam("uuid") Long id){
  return addressService.getAllAddressByUserId(id);
}

@DeleteMapping("/delete/{addressId}/{id}")
public String addAddress(@PathVariable Long addressId, @PathVariable Long id) {
return addressService.deleteAddress(addressId,id);
}

}
