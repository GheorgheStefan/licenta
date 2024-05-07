package com.licenta.backend.service;

import com.licenta.backend.dto.order.OrderRequestDto;
import com.licenta.backend.dto.order.OrderResponseDto;
import com.licenta.backend.dto.order.response.OrderDashboardResponseDto;
import com.licenta.backend.dto.order.response.UserLastOrderResponseDto;
import com.licenta.backend.dto.order.response.UserOrdersResponseDto;
import com.licenta.backend.entity.*;
import com.licenta.backend.exceptions.UserDoNotExistException;
import com.licenta.backend.repository.OrderRepository;
import com.licenta.backend.repository.ShoppingCartRepository;
import com.licenta.backend.repository.SizesRepository;
import com.licenta.backend.repository.UserRepository;
import com.licenta.backend.service.utils.EmailService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class OrderService {
    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final ShoppingCartRepository shoppingCartRepository;
    private final UserAddressService userAddressService;
    private final OrderProductService orderProductService;
    private final SizesRepository sizesRepository;
    private final CartProductService cartProductService;
    private final EmailService emailService;

    @Transactional
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
                .shippingPrice(orderRequestDto.getShippingPrice())
                .productsPrice(orderRequestDto.getProductsPrice())
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
                .userMail(user.get().getEmail())
                .orderId(order1.getId())
                .orderDate(order1.getOrderDate())
                .status(order1.getStatus())
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

    public List<OrderDashboardResponseDto> getAllOrdersDashboard() {
        List<Order> orders = orderRepository.findAll();
        List<OrderDashboardResponseDto> orderDashboardResponseDtos = new ArrayList<>();
        for (Order order : orders) {
            OrderDashboardResponseDto orderDashboardResponseDto = OrderDashboardResponseDto.builder()
                    .orderId(order.getId())
                    .orderDate(order.getOrderDate())
                    .productsPrice(order.getProductsPrice())
                    .shippingPrice(order.getShippingPrice())
                    .shippingOption(order.getShippingOption())
                    .status(order.getStatus())
                    .userId(order.getUser().getId())
                    .build();
            orderDashboardResponseDtos.add(orderDashboardResponseDto);
        }
        return orderDashboardResponseDtos;

    }

    public Order getOrderById(Long id) {
        return orderRepository.findById(id).orElseThrow(() -> new RuntimeException("Order not found"));
    }

    public UserLastOrderResponseDto getUserLastOrder(Long userId) {
        List<Order> orders = orderRepository.findOrdersByUserId(userId);
        if (orders.isEmpty()) {
            return null;
        }
        orders.sort((o1, o2) -> o2.getOrderDate().compareTo(o1.getOrderDate()));
        Order order = orders.get(0);
        return UserLastOrderResponseDto.builder()
                .orderId(order.getId())
                .orderDate(order.getOrderDate())
                .productsPrice(order.getProductsPrice())
                .shippingPrice(order.getShippingPrice())
                .shippingOption(order.getShippingOption())
                .totalPrice(order.getProductsPrice() + order.getShippingPrice())
                .status(order.getStatus())
                .build();
    }

    public List<UserOrdersResponseDto> getUserOrders(Long userId) {
        List<Order> orders = orderRepository.findOrdersByUserId(userId);
        List<UserOrdersResponseDto> userOrdersResponseDtos = new ArrayList<>();
        for (Order order : orders) {
            UserOrdersResponseDto userOrdersResponseDto = UserOrdersResponseDto.builder()
                    .orderId(order.getId())
                    .orderDate(order.getOrderDate())
                    .shippingOption(order.getShippingOption())
                    .totalPrice(order.getProductsPrice() + order.getShippingPrice())
                    .status(order.getStatus())
                    .build();
            userOrdersResponseDtos.add(userOrdersResponseDto);
        }
        return userOrdersResponseDtos;
    }

}
