package com.licenta.backend.service;


import com.licenta.backend.dto.login.DtoLoginRequest;
import com.licenta.backend.dto.login.DtoLoginResponse;
import com.licenta.backend.entity.User;
import com.licenta.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class LoginService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public DtoLoginResponse login(DtoLoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword()))
            throw new RuntimeException("Invalid password");

//        log.info("username is {}, {}", user.getEmail(), user.getClass().getName());

        return DtoLoginResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .role(user.getRole())
                .firstname(user.getFirstname())
                .lastname(user.getLastname())
                .build();
    }
}
