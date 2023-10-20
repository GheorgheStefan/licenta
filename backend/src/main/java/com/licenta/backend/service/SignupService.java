package com.licenta.backend.service;

import com.licenta.backend.dto.signin.DtoSignupRequest;
import com.licenta.backend.dto.signin.DtoSignupResponse;
import com.licenta.backend.entity.Role;
import com.licenta.backend.entity.User;
import com.licenta.backend.repository.UserRepository;
import com.licenta.backend.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SignupService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public DtoSignupResponse signup(DtoSignupRequest request) {

        if (checkIfUserExists(request.getEmail())) {
            throw new RuntimeException("User already exists");
        }

        var newUser = new User();
        newUser.setEmail(request.getEmail());
        newUser.setPassword(passwordEncoder.encode(request.getPassword()));
        newUser.setFirstname(request.getFirstname());
        newUser.setLastname(request.getLastname());
        newUser.setRole(Role.USER);

        userRepository.save(newUser);

        return DtoSignupResponse.builder()
                .token(jwtService.generateToken(newUser))
                .build();
    }

    boolean checkIfUserExists(String email) {
        return userRepository.findByEmail(email).isPresent();
    }

}
