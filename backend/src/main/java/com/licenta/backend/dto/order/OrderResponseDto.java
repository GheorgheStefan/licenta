package com.licenta.backend.dto.order;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderResponseDto {
    private String userMail;
    private Long orderId;
    private LocalDate orderDate;
    private String status;
    private String deliveryNumber;
}
