package com.licenta.backend.service;

import com.licenta.backend.dto.shoping_cart.request.ShoppingRequestDto;
import com.licenta.backend.dto.shoping_cart.response.ShoppingResponseDto;
import com.licenta.backend.entity.CartProduct;
import com.licenta.backend.entity.Product;
import com.licenta.backend.entity.ShoppingCart;
import com.licenta.backend.entity.Size;
import com.licenta.backend.repository.ShoppingCartRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class ShoppingCartService {

    private final ShoppingCartRepository shoppingCartRepository;
    private final ProductService productService;
    private final UserService userService;
    private final CartProductService cartProductService;
    private final SizesService sizesService;


    public ShoppingResponseDto addProductToCart(ShoppingRequestDto shoppingRequestDto) {
        Product product = productService.findById(shoppingRequestDto.getProductId());


        CartProduct cartProduct = CartProduct.builder()
                .product(product)
                .amount(shoppingRequestDto.getAmount())
                .size(shoppingRequestDto.getSize())
                .build();

        List<Size> sizes = sizesService.findSizesByProductId(shoppingRequestDto.getProductId());

        //verify if the shoppingCart exists
        ShoppingCart shoppingCart;
        Optional<ShoppingCart> shoppingCartExists = shoppingCartRepository.findShoppingCartByUserId(shoppingRequestDto.getUserId());
        if(shoppingCartExists.isEmpty()){
            shoppingCart = ShoppingCart.builder()
                    .user(userService.findUserById(shoppingRequestDto.getUserId()))
                    .build();
            shoppingCartRepository.save(shoppingCart);
        }

        CartProduct cartProduct1;
        Optional<CartProduct> cartProductExists = verifyIfProductIsInCart(shoppingRequestDto.getUserId(), shoppingRequestDto.getProductId(), shoppingRequestDto.getSize());

        if(cartProductExists.isPresent()){
            cartProduct1 = cartProductExists.get();
            int sizeMax = sizes.stream().filter(size1 -> size1.getSize().equals(cartProduct1.getSize())).findFirst().get().getQuantity();
            if(sizeMax <  cartProduct1.getAmount() + shoppingRequestDto.getAmount()){
                return ShoppingResponseDto.builder().nimic("nimic").build();
            }
            cartProduct1.setAmount(cartProduct1.getAmount() + shoppingRequestDto.getAmount());
        }else{
            cartProduct1 = CartProduct.builder()
                    .product(productService.findById(shoppingRequestDto.getProductId()))
                    .amount(shoppingRequestDto.getAmount())
                    .size(shoppingRequestDto.getSize())
                    .cart(findShoppingCartByUserId(shoppingRequestDto.getUserId()).get())
                    .build();

        }
        cartProductService.saveCartProduct(cartProduct1);
        return ShoppingResponseDto.builder().nimic("nimic").build();
    }

    public Optional<ShoppingCart> findShoppingCartByUserId(Long userId){
        if (shoppingCartRepository.findShoppingCartByUserId(userId).isEmpty()){
            return Optional.empty();
        }
        return shoppingCartRepository.findShoppingCartByUserId(userId);
    }
    public Optional<CartProduct> verifyIfProductIsInCart(Long userId, Long productId, String size){
        Optional<ShoppingCart> shoppingCart = shoppingCartRepository.findShoppingCartByUserId(userId);
        if(shoppingCart.isPresent()){
            ShoppingCart cart = shoppingCart.get();
            List<CartProduct> cartProducts = cartProductService.findCartProductsByCartId(cart.getId());
            if (cartProducts.isEmpty()){
                return Optional.empty();
            }
            return cartProducts.stream().filter(cartProduct -> cartProduct.getProduct().getId().equals(productId) && cartProduct.getSize().equals(size)).findFirst();
        }
        return Optional.empty();
    }

//    public void deleteProductFromCart(Long userId, Long productId, String size){
//        Optional<CartProduct> cartProduct = verifyIfProductIsInCart(userId, productId, size);
//        if(cartProduct.isPresent()){
//            cartProductService.deleteCartProductById(cartProduct.get().getId());
//        }
//    }

    public ShoppingCart getUserShoppingCart(Long userId){
        Optional<ShoppingCart> shoppingCart = shoppingCartRepository.findShoppingCartByUserId(userId);
        return shoppingCart.orElse(null);
    }


}
