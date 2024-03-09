package com.licenta.backend.repository;

import com.licenta.backend.entity.Sizes;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface SizesRepository extends JpaRepository<Sizes, Long> {
    Optional<Sizes> findSizesById(Long productId);

}
