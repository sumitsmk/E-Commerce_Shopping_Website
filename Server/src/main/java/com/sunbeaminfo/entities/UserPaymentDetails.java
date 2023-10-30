package com.sunbeaminfo.entities;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonBackReference; 

@Entity
public class UserPaymentDetails extends BaseEntity {

    private String accountHolderName;

    private String bankName;

    private double cardNo;

    private int expiryDate;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    private User user;


    @OneToMany(mappedBy = "userPaymentDetails")
    private List<Payments> paymentsList = new ArrayList<>();





    public String getAccountHolderName() {
        return accountHolderName;
    }

    public void setAccountHolderName(String accountHolderName) {
        this.accountHolderName = accountHolderName;
    }

    public String getBankName() {
        return bankName;
    }

    public void setBankName(String bankName) {
        this.bankName = bankName;
    }

    public double getCardNo() {
        return cardNo;
    }

    public void setCardNo(double cardNo) {
        this.cardNo = cardNo;
    }

    public int getExpiryDate() {
        return expiryDate;
    }

    public void setExpiryDate(int expiryDate) {
        this.expiryDate = expiryDate;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }


    
    
}
