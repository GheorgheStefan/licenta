package com.licenta.backend.controller;


import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.licenta.backend.dto.product.ImageDetails;
import com.licenta.backend.dto.product.ProductRegisterRequestDto;
import com.licenta.backend.dto.product.ProductRegisterResponseDto;
import com.licenta.backend.dto.product.SizeDetails;
import com.licenta.backend.entity.OtherProductImages;
import com.licenta.backend.entity.Product;
import com.licenta.backend.entity.Sizes;
import com.licenta.backend.service.GoogleCloudStorageService;
import com.licenta.backend.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

import static org.springframework.http.ResponseEntity.ok;

@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;
    private final ObjectMapper objectMapper;
    private final GoogleCloudStorageService googleCloudStorageService;

    @PostMapping("/add")
    public ResponseEntity<ProductRegisterResponseDto> addProduct(
            @ModelAttribute ProductRegisterRequestDto productRegisterRequestDto
    ) throws IOException {
        List<OtherProductImages> otherProductImages = new ArrayList<>();
        List<Sizes> sizes = new ArrayList<>();
        List<ImageDetails> imageList = objectMapper.readValue(productRegisterRequestDto.getSelectedImages(), new TypeReference<>() {});
        List<SizeDetails> sizeDetailsList = objectMapper.readValue(productRegisterRequestDto.getSizes(), new TypeReference<>() {});
        for (var image : imageList){
            otherProductImages.add(OtherProductImages.builder()
                    .imageUrl(googleCloudStorageService.saveImage(Base64.getDecoder().decode((image.getImageUrl())), image.getImageType()))
                    .build());
        }
        for (var size : sizeDetailsList){
            sizes.add(Sizes.builder()
                            .quantity(size.getQuantity())
                            .size(size.getSize())
                    .build());
        }
        Product product = Product.builder()
                .name(productRegisterRequestDto.getName())
                .description(productRegisterRequestDto.getDescription())
                .price(productRegisterRequestDto.getPrice())
                .presentationImage(googleCloudStorageService.saveImage(productRegisterRequestDto.getPresentationImage()))
                .selectedImages(otherProductImages)
                .productSizes(sizes)
                .build();
        productService.save(product);

        return ok(ProductRegisterResponseDto.builder()
                .id(product.getId())
                .name(product.getName())
                .description(product.getDescription())
                .price(product.getPrice())
                .imageUrl(product.getPresentationImage())
                .build());
    }

    @GetMapping("/all")
    public List<Product> getAllProducts() {
        return productService.findAll();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity deleteProduct(@PathVariable Long id) {
    Product product = productService.findById(id);
    for (var image : product.getSelectedImages()){
        googleCloudStorageService.deleteImage(image.getImageUrl());
    }
    googleCloudStorageService.deleteImage(product.getPresentationImage());
    productService.deleteById(id);
        return new ResponseEntity(HttpStatus.OK);
    }

}
