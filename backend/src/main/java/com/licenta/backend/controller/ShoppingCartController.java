package com.licenta.backend.controller;


import com.licenta.backend.dto.shoping_cart.request.ShoppingRequestDto;
import com.licenta.backend.dto.shoping_cart.response.ShoppingResponseDto;
import com.licenta.backend.entity.ShoppingCart;
import com.licenta.backend.service.ShoppingCartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/{id}")
    public ResponseEntity<Long> getShoppingCart(@PathVariable Long id){
        ShoppingCart shoppingCart = shoppingCartService.getUserShoppingCart(id);
        return ResponseEntity.ok(shoppingCart.getId());
    }



}
