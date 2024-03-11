package com.licenta.backend.repository;

import com.licenta.backend.entity.Sizes;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;


public interface SizesRepository extends JpaRepository<Sizes, Long> {
    Optional<Sizes> findSizesById(Long productId);
    @Modifying
    @Transactional
    @Query("DELETE FROM Sizes opi WHERE opi.product.id = :productId")
    void deleteByProductId(Long productId);

}
