package com.licenta.backend.controller;

import com.licenta.backend.dto.user_address.request.AddAddressRequestDto;
import com.licenta.backend.dto.user_address.request.UpdateAddressRequestDto;
import com.licenta.backend.dto.user_address.response.UserAddressResponseDto;
import com.licenta.backend.dto.user_address.response.AddAddressResponseDto;
import com.licenta.backend.dto.user_address.response.UserAddressUpdateResponseDto;
import com.licenta.backend.service.UserAddressService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user-address")
@RequiredArgsConstructor
public class UserAddressController {
    private final UserAddressService userAddressService;

    @PostMapping("")
    public ResponseEntity<AddAddressResponseDto> addAddress(
            @ModelAttribute AddAddressRequestDto addAddressRequestDto
    ) {
        System.out.println(addAddressRequestDto);
        return ResponseEntity.ok(userAddressService.addAddress(addAddressRequestDto));
    }


    @GetMapping("/billing/{userMail}")
    public ResponseEntity<UserAddressResponseDto> getBillingAddress(
            @PathVariable String userMail) {
        return ResponseEntity.ok(userAddressService.getBillingAddress(userMail));
    }

    @GetMapping("/shipping/{userMail}")
    public ResponseEntity<UserAddressResponseDto> getShippingAddress(
            @PathVariable String userMail
    ) {
        return ResponseEntity.ok(userAddressService.getShippingAddress(userMail));
    }

    @GetMapping("/{userMail}")
    public ResponseEntity<List<UserAddressResponseDto>> getUserAddresses(
            @PathVariable String userMail
    ) {
        return ResponseEntity.ok(userAddressService.getUserAddresses(userMail));
    }

    @PutMapping("")
    public ResponseEntity<AddAddressResponseDto> updateAddress(
            @ModelAttribute UpdateAddressRequestDto updateAddressRequestDto
            ) {
        return ResponseEntity.ok(userAddressService.updateAddress(updateAddressRequestDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAddress(
            @PathVariable Long id
    ) {
        userAddressService.deleteAddress(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/address/{addressId}")
    public ResponseEntity<UserAddressUpdateResponseDto> getAddressById(
            @PathVariable Long addressId
    ) {
        return ResponseEntity.ok(userAddressService.getAddressById(addressId));
    }
}
