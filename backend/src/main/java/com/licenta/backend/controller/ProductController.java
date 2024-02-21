package com.licenta.backend.controller;

import com.licenta.backend.dto.product.ProductRegisterRequestDto;
import com.licenta.backend.dto.product.ProductRegisterResponseDto;
import com.licenta.backend.entity.Product;
import com.licenta.backend.service.GoogleCloudStorageService;
import com.licenta.backend.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.net.http.HttpResponse;
import java.util.List;

import static org.springframework.http.ResponseEntity.ok;

@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;
    private final GoogleCloudStorageService googleCloudStorageService;

    @PostMapping("/add")
    public ResponseEntity<ProductRegisterResponseDto> addProduct(
            @ModelAttribute ProductRegisterRequestDto productRegisterRequestDto
    ) throws IOException {

        Product product = Product.builder()
                .name(productRegisterRequestDto.getName())
                .description(productRegisterRequestDto.getDescription())
                .price(productRegisterRequestDto.getPrice())
                .imageUrl(googleCloudStorageService.saveImage(productRegisterRequestDto.getFile()))
                .build();
        product = productService.save(product);

        return ok(ProductRegisterResponseDto.builder()
                .name(product.getName())
                .description(product.getDescription())
                .price(product.getPrice())
                .imageUrl(product.getImageUrl())
                .build());
    }

    @GetMapping("/all")
    public List<Product> getAllProducts() {
        return productService.findAll();
    }

}
