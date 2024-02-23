package com.licenta.backend.repository;

import com.licenta.backend.entity.OtherProductImages;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OtherProductImagesRepository extends JpaRepository<OtherProductImages, Long> {
    Optional<OtherProductImages> findByProductId(Long productId);
}
