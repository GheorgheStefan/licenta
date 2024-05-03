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
public class OrderDashboardResponseDto {
    private Long orderId;
    private LocalDate orderDate;
    private Float productsPrice;
    private Float shippingPrice;
    private String shippingOption;
    private String status;
    private Long userId;
}
