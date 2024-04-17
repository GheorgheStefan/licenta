package com.licenta.backend.dto.shoping_cart.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserShoppingCartResponseDto {
    private String brand;
    private String name;
    private String size;
    private String presentationImage;
    private float price;
    private int amount;


}
