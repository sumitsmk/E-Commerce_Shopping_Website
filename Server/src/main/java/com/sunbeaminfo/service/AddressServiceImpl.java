package com.sunbeaminfo.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sunbeaminfo.DTO.AddressDTO;
import com.sunbeaminfo.dao.AddressRepository;
import com.sunbeaminfo.dao.UserRepository;
import com.sunbeaminfo.entities.Address;
import com.sunbeaminfo.entities.User;
@Service
@Transactional
public class AddressServiceImpl implements AddressService{

@Autowired
private AddressRepository addressRepository;
@Autowired
private UserRepository userRepository;


@Override

public Address createAddress(Address address , Long userId) {
   User user = userRepository.findById(userId).get();
       Set<Address> addresses = user.getAddresses();
       Address updatedAddress = addressRepository.save(address);
       addresses.add(address);
userRepository.save(user);
return updatedAddress;
}
 

//Showing LazyIntialize Error
// @Override
// public List<Address> getAllAddressByUserId(Long id) {
// User user = userRepository.findById(id).get();
// Set<User> userList = new HashSet<>();
// userList.add(user);
// // Set<Address> set = user.getAddresses();
// List<Address> list = addressRepository.findByUsers(userList);
// return list;
// }

@Override
@Transactional
public List<AddressDTO> getAllAddressByUserId(Long id) {
    User user = userRepository.findById(id).orElse(null); // Use .orElse(null) to handle cases where the user may not exist
    if (user == null) {
        // Handle user not found case
        return Collections.emptyList();
    }
    List<AddressDTO> addressDTO = new ArrayList<>();
    List<Address> list = addressRepository.findByUsers(user);
    for (Address address : list) {
        AddressDTO add = new AddressDTO();
        add.setCity(address.getCity());
        add.setCountry(address.getCountry());
        add.setHouse_no(address.getHouse_no());
        add.setLandmark(address.getLandmark());
        add.setPincode(address.getPincode());
        addressDTO.add(add);
    }


    return addressDTO;
}


@Override
public String deleteAddress(Long addressId, Long id) {
User user = userRepository.findById(id).get();
        Set<Address> addresses = user.getAddresses();
        Address address = addressRepository.getById(addressId);
        addressRepository.deleteById(addressId);;
        addresses.remove(address);
userRepository.save(user);
return "success";
}

}