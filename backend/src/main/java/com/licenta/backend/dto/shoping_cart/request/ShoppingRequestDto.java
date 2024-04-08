package com.licenta.backend.dto.shoping_cart.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ShoppingRequestDto {

    private Long productId;
    private Long userId;
    private Integer amount;
    private String size;
}
