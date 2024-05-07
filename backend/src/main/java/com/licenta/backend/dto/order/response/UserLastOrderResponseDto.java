package com.licenta.backend.dto.order.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserLastOrderResponseDto {
    private Long orderId;
    private LocalDate orderDate;
    private String shippingOption;
    private Float productsPrice;
    private Float shippingPrice;
    private Float totalPrice;
    private String status;
}
