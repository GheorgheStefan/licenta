package com.licenta.backend.repository;

import com.licenta.backend.entity.Size;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;


public interface SizesRepository extends JpaRepository<Size, Long> {
    @Modifying
    @Transactional
    @Query("DELETE FROM Size opi WHERE opi.product.id = :productId")
    void deleteByProductId(Long productId);

    List<Size> findByProductId(Long productId);


}
