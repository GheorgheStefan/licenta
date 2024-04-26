package com.licenta.backend.dto.pdfDto;

import com.licenta.backend.entity.OrderProduct;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderCreatePdfDto {

    private Long id; //uuid possibly
    private LocalDate orderDate;
    private String phoneNumber;
    private String email;
    private String firstName;
    private String lastName;

    private String shippingAddress;
    private String shippingCountry;
    private String shippingCity;
    private String shippingRegion;
    private String shippingPostalCode;

    private String billingAddress;
    private String billingCountry;
    private String billingCity;
    private String billingRegion;
    private String billingPostalCode;

    private List<OrderProduct> products;
}
