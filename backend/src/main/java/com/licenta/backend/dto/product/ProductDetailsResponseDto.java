package com.licenta.backend.dto.product;

import com.licenta.backend.entity.OtherProductImages;
import com.licenta.backend.entity.Product;
import com.licenta.backend.entity.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductDetailsResponseDto {

        private Product product;
        private List<Size> sizes;
        private List<OtherProductImages> images;

}
