package com.licenta.backend.controller;

import com.licenta.backend.dto.DtoUsersResponse;
import com.licenta.backend.entity.User;
import com.licenta.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UsersController {
    private final UserRepository userRepository;


    @GetMapping()
    public ResponseEntity<List<DtoUsersResponse>> getAllUsers() {
        List<User> users = userRepository.findAll();

        List<DtoUsersResponse> usersResponse = users.stream()
                .map(user -> DtoUsersResponse.builder()
                        .id(user.getId())
                        .email(user.getEmail())
                        .password(user.getPassword())
                        .build())
                .toList();
        return new ResponseEntity<>(usersResponse, org.springframework.http.HttpStatus.OK);
    }

}
