package com.licenta.backend.dto.order;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AssignDeliveryGuyRequestDto {
    private String deliveryGuyEmail;
    private Long orderId;
}
