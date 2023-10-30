package com.sunbeaminfo.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AddressDTO {

    private String house_no;

    private String landmark;

    private String city;

    private int pincode;

    private String country;
}
