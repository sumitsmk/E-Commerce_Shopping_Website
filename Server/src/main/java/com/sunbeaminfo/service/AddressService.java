package com.sunbeaminfo.service;

import java.util.List;
import java.util.Set;

import com.sunbeaminfo.DTO.AddressDTO;
import com.sunbeaminfo.entities.Address;

public interface AddressService {
Address createAddress(Address address,Long id);
List<AddressDTO> getAllAddressByUserId(Long id);
String deleteAddress(Long address,Long id);
}