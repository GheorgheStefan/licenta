package com.licenta.backend.dto.product;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ImageDetails {
    public String imageUrl;
    public String ImageType;
}
