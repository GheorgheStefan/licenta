package com.licenta.backend.controller;

import com.licenta.backend.dto.login.DtoLoginRequest;
import com.licenta.backend.dto.login.DtoLoginResponse;
import com.licenta.backend.security.JwtService;
import com.licenta.backend.service.LoginService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/login")
@RequiredArgsConstructor
public class LoginController {

    private final LoginService loginService;
    private final JwtService jwtService;

    @GetMapping()
    public ResponseEntity<DtoLoginResponse> login(
            @RequestBody DtoLoginRequest request
    ) {
        return ResponseEntity.ok(loginService.login(request));
    }



}
