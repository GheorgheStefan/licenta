//package com.licenta.backend.controller;
//
//import com.licenta.backend.entity.Product;
//import com.licenta.backend.service.ProductService;
//import lombok.RequiredArgsConstructor;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/products")
//@RequiredArgsConstructor
//public class ProductController {
//
//    private final ProductService productService;
//
//    @GetMapping("/all")
//    public List<Product> findAll() {
//        return productService.findAll();
//    }
//}
