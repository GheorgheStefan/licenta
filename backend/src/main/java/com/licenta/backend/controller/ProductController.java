package com.licenta.backend.controller;

import com.licenta.backend.dto.product.ProductRequestDto;
import com.licenta.backend.entity.Product;
import com.licenta.backend.service.GoogleCloudStorageService;
import com.licenta.backend.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;
    private final GoogleCloudStorageService googleCloudStorageService;

    @PostMapping("/add")
    public Product addProduct(
            @ModelAttribute ProductRequestDto productRequestDto
    ) throws IOException {

        Product product = Product.builder()
                .name(productRequestDto.getName())
                .description(productRequestDto.getDescription())
                .price(productRequestDto.getPrice())
                .imageUrl(googleCloudStorageService.saveImage(productRequestDto.getFile()))
                .build();

        return productService.save(product);
    }

}
