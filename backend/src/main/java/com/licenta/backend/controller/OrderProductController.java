package com.licenta.backend.controller;

import com.licenta.backend.entity.OrderProduct;
import com.licenta.backend.service.OrderProductService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/order-product")
@RequiredArgsConstructor
public class OrderProductController {
    private final OrderProductService orderProductService;

    @GetMapping("/order/{orderId}")
    public List<OrderProduct> getOrderProducts(@PathVariable Long orderId) {
        return orderProductService.getAllOrderProductsByOrderId(orderId);
    }
}
