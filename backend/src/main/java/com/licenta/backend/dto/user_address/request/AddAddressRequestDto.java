package com.licenta.backend.dto.user_address.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AddAddressRequestDto {
    private String userMail;
    private String phoneNumber;
    private String address;
    private String postalCode;
    private String country;     //Romania
    private String region;      //Olt
    private String city;        //Slatina
    private String isBillingAddress;
    private String isShippingAddress;

}
