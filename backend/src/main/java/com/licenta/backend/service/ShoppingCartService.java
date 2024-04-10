package com.licenta.backend.service;

import com.licenta.backend.dto.shoping_cart.request.ShoppingRequestDto;
import com.licenta.backend.dto.shoping_cart.response.ShoppingResponseDto;
import com.licenta.backend.entity.Product;
import com.licenta.backend.entity.ShoppingCart;
import com.licenta.backend.entity.Sizes;
import com.licenta.backend.repository.ShoppingCartRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class ShoppingCartService {

    private final ShoppingCartRepository shoppingCartRepository;
    private final ProductService productService;
    private final SizesService sizesService;
    private final UserService userService;

    public ShoppingResponseDto addProductToCart(ShoppingRequestDto shoppingRequestDto) {
//        log.info("Adding product to cart");
//        log.info(shoppingRequestDto.toString());
//        log.info("Product: " + productService.findById(shoppingRequestDto.getProductId()).toString());
//        log.info("Size: " + sizesService.findSizesByProductId(shoppingRequestDto.getProductId()).toString());
//        log.info("User: " + userService.findUserById(shoppingRequestDto.getUserId()).toString());
        List<Product> products = new ArrayList<>();
        products.add(productService.findById(shoppingRequestDto.getProductId()));
        ShoppingCart shoppingCart = ShoppingCart.builder()
                .productList(products)
                .user(userService.findUserById(shoppingRequestDto.getUserId()))
                .amount(shoppingRequestDto.getAmount())
                .size(shoppingRequestDto.getSize())
                .build();
        shoppingCartRepository.save(shoppingCart);
        return ShoppingResponseDto.builder().nimic("nimic").build();
    }
}
