package com.licenta.backend.dto.order;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderRequestDto {
    private Long userId;
    private String shippingMethod;
    private Float productsPrice;
    private Float shippingPrice;
    private String paymentMethod;
}
