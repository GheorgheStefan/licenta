package com.licenta.backend.controller;

import com.licenta.backend.dto.DtoUsersResponse;
import com.licenta.backend.dto.user.request.RegisterRequestDto;
import com.licenta.backend.dto.user.request.SigninRequestDto;
import com.licenta.backend.dto.user.response.RegisterResponseDto;
import com.licenta.backend.dto.user.response.SigninResponseDto;
import com.licenta.backend.entity.User;
import com.licenta.backend.repository.UserRepository;
import com.licenta.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UsersController {
    private final UserRepository userRepository;
    private final UserService userService;


    @PostMapping("/signin")
    public ResponseEntity<SigninResponseDto> signin(
            @RequestBody SigninRequestDto request) {
        return ResponseEntity.ok(userService.signin(request));
    }

    @PostMapping("/register")
    public ResponseEntity<RegisterResponseDto> register(
            @RequestBody RegisterRequestDto request) {
        return ResponseEntity.ok(userService.register(request));
    }

}
