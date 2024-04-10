package com.licenta.backend.controller;


import com.licenta.backend.dto.shoping_cart.request.ShoppingRequestDto;
import com.licenta.backend.dto.shoping_cart.response.ShoppingResponseDto;
import com.licenta.backend.service.ShoppingCartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/shopping-cart")
@RequiredArgsConstructor
public class ShoppingCartController {

    private final ShoppingCartService shoppingCartService;

    @PostMapping("")
    public ResponseEntity<ShoppingResponseDto>
    addProductToCart(@RequestBody ShoppingRequestDto shoppingRequestDto){
        return ResponseEntity.ok(shoppingCartService.addProductToCart(shoppingRequestDto));
    }



}
