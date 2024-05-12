package com.licenta.backend.controller;


import com.licenta.backend.dto.order.OrderRequestDto;
import com.licenta.backend.dto.order.OrderResponseDto;
import com.licenta.backend.dto.order.request.OrderUpdateRequestDto;
import com.licenta.backend.dto.order.response.OrderDashboardResponseDto;
import com.licenta.backend.dto.order.response.UserLastOrderResponseDto;
import com.licenta.backend.dto.order.response.UserOrdersResponseDto;
import com.licenta.backend.entity.Order;
import com.licenta.backend.service.OrderService;
import com.licenta.backend.service.utils.EmailService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/order")
@RequiredArgsConstructor
public class OrderController {
    private final OrderService orderService;
    private final EmailService emailService;

    @PostMapping("")
    public ResponseEntity<OrderResponseDto> createOrder(@RequestBody OrderRequestDto orderRequestDto){
        OrderResponseDto orderResponseDto = orderService.createOrder(orderRequestDto); //& send email
        emailService.sendInvoiceMail(orderResponseDto.getUserMail(), orderResponseDto.getOrderId());
        return ResponseEntity.ok(orderResponseDto);
    }

    @GetMapping("")
    public List<OrderDashboardResponseDto> getAllOrders(){
        return orderService.getAllOrdersDashboard();
    }

    @GetMapping("/{id}")
    public Order getOrderById(@PathVariable Long id){
        return orderService.getOrderById(id);
    }

    @GetMapping("/last/{userId}")
    public UserLastOrderResponseDto userLatestOrder(@PathVariable Long userId){
        return orderService.getUserLastOrder(userId);
    }
    
    @GetMapping("/user/{userId}")
    public List<UserOrdersResponseDto> getUserOrders(@PathVariable Long userId){
        return orderService.getUserOrders(userId);
    }

    @PutMapping("/status/{orderId}")
    public ResponseEntity<Void> changeOrderStatus(@PathVariable Long orderId, @ModelAttribute OrderUpdateRequestDto orderUpdateRequestDto){
        orderService.updateOrder(orderId, orderUpdateRequestDto);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/unsigned")
    public List<Order> getUnsignedOrders(){
        return orderService.getUnsignedOrders();
    }



}
