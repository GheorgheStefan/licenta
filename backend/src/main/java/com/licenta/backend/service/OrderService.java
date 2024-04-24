package com.licenta.backend.service;

import com.licenta.backend.dto.order.OrderRequestDto;
import com.licenta.backend.dto.order.OrderResponseDto;
import com.licenta.backend.entity.*;
import com.licenta.backend.exceptions.UserDoNotExistException;
import com.licenta.backend.repository.OrderRepository;
import com.licenta.backend.repository.ShoppingCartRepository;
import com.licenta.backend.repository.SizesRepository;
import com.licenta.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class OrderService {
    private final OrderRepository orderRepository;
    private final ShoppingCartService shoppingCartService;
    private final UserService userService;
    private final UserRepository userRepository;
    private final ShoppingCartRepository shoppingCartRepository;
    private final UserAddressService userAddressService;
    private final OrderProductService orderProductService;
    private final SizesService sizesService;
    private final SizesRepository sizesRepository;
    private final CartProductService cartProductService;

    public OrderResponseDto createOrder(OrderRequestDto orderRequestDto) {
        Optional<User> user = userRepository.findById(orderRequestDto.getUserId());

        if (user.isEmpty()) {
            throw new UserDoNotExistException("User not found");
        }

        Optional<ShoppingCart> shoppingCart = shoppingCartRepository.findShoppingCartByUserId(orderRequestDto.getUserId());

        if (shoppingCart.isEmpty()) {
            throw new RuntimeException("Shopping do not exists!");
        }

        List<CartProduct> cartProducts = shoppingCart.get().getCartProducts();
        List<OrderProduct> orderProducts = new ArrayList<>();
        for (CartProduct cartProduct : cartProducts) {
            OrderProduct orderProduct = new OrderProduct();
            orderProduct.setProduct(cartProduct.getProduct());
            orderProduct.setAmount(cartProduct.getAmount());
            orderProduct.setSize(cartProduct.getSize());
            orderProduct.setOrder(null);
            orderProducts.add(orderProduct);
        }

        UserAddress billingAddress = userAddressService.findBillingAddress(user.get().getId());
        UserAddress shippingAddress = userAddressService.findShippingAddress(user.get().getId());

        Order order = Order.builder()
                .user(user.get())
                .orderDate(LocalDate.now())
                .status("PENDING")
                .shippingOption(orderRequestDto.getShippingMethod())
                .deliveryAddress(shippingAddress.getAddress())
                .deliveryCity(shippingAddress.getCity())
                .deliveryRegion(shippingAddress.getRegion())
                .deliveryCountry(shippingAddress.getCountry())
                .deliveryPostalCode(shippingAddress.getPostalCode())
                .deliveryPhoneNumber(shippingAddress.getPhoneNumber())
                .BillingAddress(billingAddress.getAddress())
                .BillingCity(billingAddress.getCity())
                .BillingRegion(billingAddress.getRegion())
                .BillingCountry(billingAddress.getCountry())
                .BillingPostalCode(billingAddress.getPostalCode())
                .BillingPhoneNumber(billingAddress.getPhoneNumber())
                .build();

        Order order1 = orderRepository.save(order);

        for (OrderProduct orderProduct : orderProducts) {
            orderProduct.setOrder(order1);
            orderProductService.save(orderProduct);
        }

        updateSize(cartProducts);
        for(CartProduct cartProduct : cartProducts){
            cartProductService.deleteCartProduct(cartProduct.getId());
        }

        return OrderResponseDto.builder()
                .orderId(order.getId())
                .orderDate(order.getOrderDate())
                .status(order.getStatus())
                .build();
    }

    public void updateSize(List<CartProduct> cartProducts) {
        for (CartProduct cartProduct : cartProducts) {
            Product product = cartProduct.getProduct();
            List<Size> size = sizesRepository.findByProductId(product.getId());
            for (Size size1 : size) {
                if (size1.getSize().equals(cartProduct.getSize())) {
                    size1.setQuantity(size1.getQuantity() - cartProduct.getAmount());
                    sizesRepository.save(size1);
                    if (size1.getQuantity() == 0) {
                        sizesRepository.delete(size1);
                    }
                }
            }


        }

    }

}
