package com.sunbeaminfo.DTO;

import java.util.Calendar;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.sunbeaminfo.entities.Products;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderedProductDTO {

    private int quantity;

    private double price;

    private Calendar timeStamp;

    @JsonManagedReference
    private Products product;
    
}
