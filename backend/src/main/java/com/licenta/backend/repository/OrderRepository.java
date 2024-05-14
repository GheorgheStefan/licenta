package com.licenta.backend.repository;

import com.licenta.backend.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findOrdersByUserId(Long userId);

    List<Order> findOrdersByDeliveryGuyId(Long deliveryGuyId);
}
