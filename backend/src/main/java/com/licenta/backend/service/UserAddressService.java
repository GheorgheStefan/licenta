package com.licenta.backend.service;


import com.licenta.backend.dto.user_address.request.AddAddressRequestDto;
import com.licenta.backend.dto.user_address.request.UpdateAddressRequestDto;
import com.licenta.backend.dto.user_address.response.AddAddressResponseDto;
import com.licenta.backend.dto.user_address.response.UserAddressResponseDto;
import com.licenta.backend.dto.user_address.response.UserAddressUpdateResponseDto;
import com.licenta.backend.entity.User;
import com.licenta.backend.entity.UserAddress;
import com.licenta.backend.repository.UserAddressRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserAddressService {

    private final UserAddressRepository userAddressRepository;
    private final UserService userService;

    public UserAddressUpdateResponseDto getAddressById(Long id){
        UserAddress userAddress = userAddressRepository.findById(id).orElse(null);
        if (userAddress == null){
            log.error("Address not found");
        }

        return UserAddressUpdateResponseDto.builder()
                .phoneNumber(userAddress.getPhoneNumber())
                .address(userAddress.getAddress())
                .postalCode(userAddress.getPostalCode())
                .country(userAddress.getCountry())
                .region(userAddress.getRegion())
                .city(userAddress.getCity())
                .isBillingAddress(String.valueOf(userAddress.isBillingAddress()))
                .isShippingAddress(String.valueOf(userAddress.isShippingAddress()))
                .build();
    }

    public AddAddressResponseDto addAddress(AddAddressRequestDto addAddressRequestDto) {
        boolean isBillingAddress;
        boolean isShippingAddress;

        if ("true".equals(addAddressRequestDto.getIsBillingAddress())){
            isBillingAddress = true;
        } else {
            isBillingAddress = false;
        }

        if ("true".equals(addAddressRequestDto.getIsShippingAddress())){
            isShippingAddress = true;
        } else {
            isShippingAddress = false;
        }
        User user = userService.findUserByEmail(addAddressRequestDto.getUserMail());

        if(isBillingAddress){
            revokeBillingAddress(user.getId());
        }
        if (isShippingAddress){
            revokeShippingAddress(user.getId());
        }

        if (findUserAddressesByUserId(user.getId()).isEmpty()){
            isBillingAddress = true;
            isShippingAddress = true;
        }

        UserAddress userAddress = UserAddress.builder()
                .user(user)
                .phoneNumber(addAddressRequestDto.getPhoneNumber())
                .address(addAddressRequestDto.getAddress())
                .postalCode(addAddressRequestDto.getPostalCode())
                .country(addAddressRequestDto.getCountry())
                .region(addAddressRequestDto.getRegion())
                .city(addAddressRequestDto.getCity())
                .billingAddress(isBillingAddress)
                .shippingAddress(isShippingAddress)
                .build();

        userAddress = userAddressRepository.save(userAddress);
        return AddAddressResponseDto.builder()
                .id(userAddress.getId())
                .build();
    }
    public UserAddress findBillingAddress(Long userId) {
        List<UserAddress> userAddresses = userAddressRepository.findUserAddressesByUserId(userId);
        return userAddresses.stream().filter(UserAddress::isBillingAddress).findFirst().orElse(null);
    }
    public UserAddress findShippingAddress(Long userId) {
        List<UserAddress> userAddresses = userAddressRepository.findUserAddressesByUserId(userId);
        return userAddresses.stream().filter(UserAddress::isShippingAddress).findFirst().orElse(null);
    }
    public void revokeBillingAddress(Long userId){
        UserAddress userAddress = findBillingAddress(userId);
        if(userAddress != null){
            userAddress.setBillingAddress(false);
            userAddressRepository.save(userAddress);
        }
    }
    public void revokeShippingAddress(Long userId){
        UserAddress userAddress = findShippingAddress(userId);
        if(userAddress != null){
            userAddress.setShippingAddress(false);
            userAddressRepository.save(userAddress);
        }
    }

    public List<UserAddress> findUserAddressesByUserId(Long userId){
        return userAddressRepository.findUserAddressesByUserId(userId);
    }

    public UserAddressResponseDto getBillingAddress(String userMail){
        User user = userService.findUserByEmail(userMail);
        UserAddress userAddress = findBillingAddress(user.getId());
        return UserAddressResponseDto.builder()
                .id(userAddress.getId())
                .userFirstName(user.getFirstname())
                .userLastName(user.getLastname())
                .phoneNumber(userAddress.getPhoneNumber())
                .address(userAddress.getAddress())
                .postalCode(userAddress.getPostalCode())
                .country(userAddress.getCountry())
                .region(userAddress.getRegion())
                .city(userAddress.getCity())
                .isBillingAddress(String.valueOf(userAddress.isBillingAddress()))
                .isShippingAddress(String.valueOf(userAddress.isShippingAddress()))
                .build();
    }

    public UserAddressResponseDto getShippingAddress(String userMail){
        User user = userService.findUserByEmail(userMail);
        UserAddress userAddress = findShippingAddress(user.getId());
        return UserAddressResponseDto.builder()
                .id(userAddress.getId())
                .userFirstName(user.getFirstname())
                .userLastName(user.getLastname())
                .phoneNumber(userAddress.getPhoneNumber())
                .address(userAddress.getAddress())
                .postalCode(userAddress.getPostalCode())
                .country(userAddress.getCountry())
                .region(userAddress.getRegion())
                .city(userAddress.getCity())
                .isBillingAddress(String.valueOf(userAddress.isBillingAddress()))
                .isShippingAddress(String.valueOf(userAddress.isShippingAddress()))
                .build();
    }

    public List<UserAddressResponseDto> getUserAddresses(String userMail){
        User user = userService.findUserByEmail(userMail);
        List<UserAddress> userAddresses = findUserAddressesByUserId(user.getId());
        return userAddresses.stream().map(userAddress -> UserAddressResponseDto.builder()
                .id(userAddress.getId())
                .userFirstName(user.getFirstname())
                .userLastName(user.getLastname())
                .phoneNumber(userAddress.getPhoneNumber())
                .address(userAddress.getAddress())
                .postalCode(userAddress.getPostalCode())
                .country(userAddress.getCountry())
                .region(userAddress.getRegion())
                .city(userAddress.getCity())
                .isBillingAddress(String.valueOf(userAddress.isBillingAddress()))
                .isShippingAddress(String.valueOf(userAddress.isShippingAddress()))
                .build()).toList();
    }

    public AddAddressResponseDto updateAddress (UpdateAddressRequestDto updateAddressRequestDto){
        boolean isBillingAddress;
        boolean isShippingAddress;
        UserAddress userAddress = userAddressRepository.findById(updateAddressRequestDto.getId()).orElse(null);

        if ("true".equals(updateAddressRequestDto.getIsBillingAddress())){
            isBillingAddress = true;
            revokeBillingAddress(userAddress.getUser().getId());
        } else {
            isBillingAddress = false;
        }

        if ("true".equals(updateAddressRequestDto.getIsShippingAddress())){
            isShippingAddress = true;
            revokeShippingAddress(userAddress.getUser().getId());
        } else {
            isShippingAddress = false;
        }

        if (userAddress != null){
            userAddress.setPhoneNumber(updateAddressRequestDto.getPhoneNumber());
            userAddress.setAddress(updateAddressRequestDto.getAddress());
            userAddress.setPostalCode(updateAddressRequestDto.getPostalCode());
            userAddress.setCountry(updateAddressRequestDto.getCountry());
            userAddress.setRegion(updateAddressRequestDto.getRegion());
            userAddress.setCity(updateAddressRequestDto.getCity());
            userAddress.setBillingAddress(isBillingAddress);
            userAddress.setShippingAddress(isShippingAddress);
            userAddressRepository.save(userAddress);
        }
        return AddAddressResponseDto.builder()
                .id(userAddress.getId())
                .build();

    }

    public void deleteAddress(Long id){
        userAddressRepository.deleteById(id);
    }

}
