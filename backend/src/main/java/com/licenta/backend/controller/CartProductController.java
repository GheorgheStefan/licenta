package com.licenta.backend.controller;

import com.licenta.backend.dto.cart_product.CartProductResponseDto;
import com.licenta.backend.entity.CartProduct;
import com.licenta.backend.service.CartProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cart-product")
@RequiredArgsConstructor
public class CartProductController {
    private final CartProductService cartProductService;

    @GetMapping("/{id}")
    public ResponseEntity<List<CartProductResponseDto>> getCartProducts(@PathVariable Long id){
        return ResponseEntity.ok(cartProductService.findCartProducts(id));
    }
    @PutMapping("/{cartProductId}/{amount}")
    public ResponseEntity<Integer> updateCartProduct(@PathVariable Long cartProductId, @PathVariable Integer amount){
        return ResponseEntity.ok(cartProductService.updateCartProduct(cartProductId, amount));
    }
    @DeleteMapping("/{cartProductId}")
    public Long deleteCartProduct(@PathVariable Long cartProductId){
        return cartProductService.deleteCartProduct(cartProductId);
    }
}
