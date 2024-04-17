package com.licenta.backend.service;

import com.licenta.backend.dto.cart_product.CartProductResponseDto;
import com.licenta.backend.entity.CartProduct;
import com.licenta.backend.entity.Product;
import com.licenta.backend.entity.Size;
import com.licenta.backend.repository.CartProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

@Slf4j
@Service
@RequiredArgsConstructor
public class CartProductService {
    private final CartProductRepository cartProductRepository;
    private final ProductService productService;

    public void saveCartProduct(CartProduct cartProduct){
        cartProductRepository.save(cartProduct);
    }

    public List<CartProduct> findCartProductsByCartId(Long id) {
        return cartProductRepository.findCartProductsByCartId(id);
    }

    public List<CartProductResponseDto> findCartProducts(Long id) {
        List<CartProduct> cartProducts = cartProductRepository.findCartProductsByCartId(id);
        List<CartProductResponseDto> cartProductResponseDtos = new ArrayList<>();
        for(CartProduct cartProduct : cartProducts){
            cartProductResponseDtos.add(CartProductResponseDto.builder()
                    .productId(cartProduct.getProduct().getId())
                    .cartProductId(cartProduct.getId())
                    .name(cartProduct.getProduct().getName())
                    .brand(cartProduct.getProduct().getBrand())
                    .presentationImage(cartProduct.getProduct().getPresentationImage())
                    .price(cartProduct.getProduct().getPrice())
                    .size(cartProduct.getSize())
                    .amount(cartProduct.getAmount())
                    .build());
        }
        return cartProductResponseDtos;
    }

    public Integer updateCartProduct(Long cartProductId, Integer amount){
        CartProduct cartProduct = cartProductRepository.findById(cartProductId).orElseThrow();
        Product product = cartProduct.getProduct();
        List<Size> sizes = product.getProductSizes();
        AtomicInteger updatedAmount = new AtomicInteger(amount);

        sizes.stream().filter(size -> size.getSize().equals(cartProduct.getSize())).findFirst().ifPresent(size -> {
            if (size.getQuantity() < amount) {
                updatedAmount.set(amount - 1);
            }
        });
        cartProduct.setAmount(updatedAmount.get());
        cartProductRepository.save(cartProduct);
        return updatedAmount.get();
        
    }

    public Long deleteCartProduct(Long cartProductId) {
        CartProduct cartProduct = cartProductRepository.findById(cartProductId).orElseThrow();
        cartProductRepository.deleteById(cartProductId);
        return cartProduct.getId();

    }
}
