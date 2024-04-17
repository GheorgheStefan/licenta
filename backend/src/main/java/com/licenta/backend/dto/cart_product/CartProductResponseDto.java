package com.licenta.backend.dto.cart_product;

import com.licenta.backend.entity.CartProduct;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CartProductResponseDto {
    private Long productId;
    private Long cartProductId;
    private String name;
    private String brand;
    private String presentationImage;
    private float price;
    private String size;
    private int amount;


}
