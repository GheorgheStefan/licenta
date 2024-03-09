package com.licenta.backend.dto.product;

import lombok.*;

@Getter
@Setter
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductRegisterResponseDto {
    private Long id;
    private String name;
    private String description;
    private float price;
    private String imageUrl;

}
