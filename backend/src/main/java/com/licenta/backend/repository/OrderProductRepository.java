package com.licenta.backend.repository;

import com.licenta.backend.entity.OrderProduct;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderProductRepository extends JpaRepository<OrderProduct, Long> {
    public List<OrderProduct> findAllByOrderId(Long orderId);

}
