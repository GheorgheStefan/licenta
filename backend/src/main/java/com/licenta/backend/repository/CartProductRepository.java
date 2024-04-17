package com.licenta.backend.repository;


import com.licenta.backend.entity.CartProduct;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CartProductRepository extends JpaRepository<CartProduct, Long> {

    List<CartProduct> findCartProductsByCartId(Long id);
}
