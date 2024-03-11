package com.licenta.backend.repository;

import com.licenta.backend.entity.OtherProductImages;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface OtherProductImagesRepository extends JpaRepository<OtherProductImages, Long> {
    Optional<OtherProductImages> findByProductId(Long productId);
    @Modifying
    @Transactional
    @Query("DELETE FROM OtherProductImages opi WHERE opi.product.id = :productId")
    void deleteByProductId(Long productId);
}
