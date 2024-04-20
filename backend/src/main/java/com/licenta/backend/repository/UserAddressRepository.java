package com.licenta.backend.repository;

import com.licenta.backend.entity.UserAddress;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserAddressRepository extends JpaRepository<UserAddress, Long> {
    List<UserAddress> findUserAddressesByUserId(Long id);
}
