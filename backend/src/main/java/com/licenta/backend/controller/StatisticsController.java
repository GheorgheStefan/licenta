package com.licenta.backend.controller;

import com.licenta.backend.dto.StatisticsResponseDto;
import com.licenta.backend.entity.Order;
import com.licenta.backend.entity.Product;
import com.licenta.backend.entity.Role;
import com.licenta.backend.entity.User;
import com.licenta.backend.repository.OrderRepository;
import com.licenta.backend.repository.ProductRepository;
import com.licenta.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/statistics")
@RequiredArgsConstructor
public class StatisticsController {
    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    @GetMapping("")
    public StatisticsResponseDto getStatistics() {
        List<Order> orders = orderRepository.findAll();
        List<User> users = userRepository.findAll();
        List<Product> products = productRepository.findAll();

        int[] counts = new int[3]; // [0] - pending, [1] - delivered, [2] - delivering
        orders.forEach(order -> {
            if (order.getStatus().equals("PENDING")) {
                counts[0]++;
            } else if (order.getStatus().equals("DELIVERED")) {
                counts[1]++;
            } else if (order.getStatus().equals("DELIVERING")) {
                counts[2]++;
            }
        });
        int numberOfPendingOrders = counts[0];
        int numberOfDeliveredOrders = counts[1];
        int numberOfDeliveringOrders = counts[2];

        int[] counts2 = new int[3]; // [0] - ADMIN, [1] - BUYER, [2] - DELIVERY
        users.forEach(user -> {
            if (user.getRole() == Role.ADMIN) {
                counts2[0]++;
            } else if (user.getRole() == Role.BUYER) {
                counts2[1]++;
            } else if (user.getRole() == Role.DELIVERY) {
                counts2[2]++;
            }
        });
        int numberOfAdmins = counts2[0];
        int numberOfBuyers = counts2[1];
        int numberOfDeliveryGuys = counts2[2];

        int[] counts3 = new int[3]; // [0] - footwear, [1] - clothing, [2] - accessories
        products.forEach(product -> {
            if (product.getSubcategory().equals("footwear")) {
                counts3[0]++;
            } else if (product.getSubcategory().equals("clothing")) {
                counts3[1]++;
            } else if (product.getSubcategory().equals("accessories")) {
                counts3[2]++;
            }
        });
        int numberOfFootwearProducts = counts3[0];
        int numberOfClothingProducts = counts3[1];
        int numberOfAccessoriesProducts = counts3[2];

        return StatisticsResponseDto.builder()
                .pendingOrders(numberOfPendingOrders)
                .deliveredOrders(numberOfDeliveredOrders)
                .deliveringOrders(numberOfDeliveringOrders)
                .numberOfAdmins(numberOfAdmins)
                .numberOfBuyers(numberOfBuyers)
                .numberOfDeliverers(numberOfDeliveryGuys)
                .numberOfProductsFootwear(numberOfFootwearProducts)
                .numberOfProductsClothing(numberOfClothingProducts)
                .numberOfProductsAccessories(numberOfAccessoriesProducts)
                .build();
    }
}
