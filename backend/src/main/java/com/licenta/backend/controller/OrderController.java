package com.licenta.backend.controller;


import com.licenta.backend.dto.MapPositionResponseDto;
import com.licenta.backend.dto.order.AllCoordinatesResponseDto;
import com.licenta.backend.dto.order.AssignDeliveryGuyRequestDto;
import com.licenta.backend.dto.order.OrderRequestDto;
import com.licenta.backend.dto.order.OrderResponseDto;
import com.licenta.backend.dto.order.request.OrderUpdateRequestDto;
import com.licenta.backend.dto.order.response.OrderDashboardResponseDto;
import com.licenta.backend.dto.order.response.UserLastOrderResponseDto;
import com.licenta.backend.dto.order.response.UserOrdersResponseDto;
import com.licenta.backend.dto.user_address.request.AddAddressRequestDto;
import com.licenta.backend.dto.validator.ValidationRequestDto;
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
        System.out.println("OrderRequestDto " + orderRequestDto);
        OrderResponseDto orderResponseDto = orderService.createOrder(orderRequestDto); //& send email
        String code = Long.toString(orderResponseDto.getOrderId());
        code += ":" + orderResponseDto.getDeliveryNumber();
        emailService.sendInvoiceMail(orderResponseDto.getUserMail(), orderResponseDto.getOrderId(), code);
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

    /////////////////////////// Delivery Guy ///////////////////////////

    @PutMapping("/assign")
    public ResponseEntity<Order> assignOrderToDeliveryGuy(@RequestBody AssignDeliveryGuyRequestDto assignDeliveryGuyRequestDto){
//        System.out.println("OrderId " + assignDeliveryGuyRequestDto.getOrderId() + " DeliveryGuyEmail " + assignDeliveryGuyRequestDto.getDeliveryGuyEmail());
        return ResponseEntity.ok(orderService.assignOrderToDeliveryGuy(assignDeliveryGuyRequestDto));
    }

    @GetMapping("/all/delivery/{deliveryGuyEmail}")
    public List<Order> getAllDeliveryGuyOrders(@PathVariable String deliveryGuyEmail){
        return orderService.getAllDeliveryGuyOrders(deliveryGuyEmail);
    }

    @PostMapping("/map/orders/{deliveryGuyEmail}")
    public List<MapPositionResponseDto> getAllCoordonates(@PathVariable String deliveryGuyEmail, @RequestBody MapPositionResponseDto mapPositionResponseDto){
        return orderService.getAllCoordonatesOfDeliveryGuy(deliveryGuyEmail, mapPositionResponseDto);
    }

    @PostMapping("/validateOrder")
    public ResponseEntity<Void> validateOrder(@ModelAttribute ValidationRequestDto validationRequestDto){
        return orderService.validateOrder(validationRequestDto);

    }


}
