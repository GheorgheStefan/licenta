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
public class UserOrdersResponseDto {
    private Long orderId;
    private LocalDate orderDate;
    private String shippingOption;
    private Float totalPrice;
    private String status;
}
