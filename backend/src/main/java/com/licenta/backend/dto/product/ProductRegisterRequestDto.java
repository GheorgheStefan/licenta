package com.licenta.backend.dto.product;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductRegisterRequestDto {

    private String name;
    private String description;
    private float price;
    private MultipartFile presentationImage;
    private String selectedImages;
}
