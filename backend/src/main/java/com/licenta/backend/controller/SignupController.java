package com.licenta.backend.controller;

import com.licenta.backend.dto.signin.DtoSignupRequest;
import com.licenta.backend.dto.signin.DtoSignupResponse;
import com.licenta.backend.service.SignupService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/signup")
@RequiredArgsConstructor
public class SignupController {

    private final SignupService signupService;

    @PostMapping()
    public ResponseEntity<DtoSignupResponse> signup(
            @RequestBody DtoSignupRequest request
    ) {
        return ResponseEntity.ok(signupService.signup(request));
    }


}
