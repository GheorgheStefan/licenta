package com.licenta.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StatisticsResponseDto {
    private Integer numberOfProductsFootwear;
    private Integer numberOfProductsClothing;
    private Integer numberOfProductsAccessories;
    private Integer numberOfAdmins;
    private Integer numberOfBuyers;
    private Integer numberOfDeliverers;
    private Integer pendingOrders;
    private Integer deliveredOrders;
    private Integer deliveringOrders;

}
