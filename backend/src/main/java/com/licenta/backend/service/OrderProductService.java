package com.licenta.backend.service;

import com.licenta.backend.dto.order.OrderRequestDto;
import com.licenta.backend.entity.OrderProduct;
import com.licenta.backend.repository.OrderProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class OrderProductService {

    private final OrderProductRepository orderProductRepository;

    public void save(OrderProduct orderProduct){
        orderProductRepository.save(orderProduct);
    }

}
