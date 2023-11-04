package com.licenta.backend.service;

import com.licenta.backend.dto.user.request.RegisterRequestDto;
import com.licenta.backend.dto.user.request.SigninRequestDto;
import com.licenta.backend.dto.user.response.RegisterResponseDto;
import com.licenta.backend.dto.user.response.SigninResponseDto;
import com.licenta.backend.entity.Role;
import com.licenta.backend.exceptions.UserAlreadyExistsException;
import com.licenta.backend.exceptions.UserDoNotExistException;
import com.licenta.backend.exceptions.WrongPasswordException;
import com.licenta.backend.repository.UserRepository;
import com.licenta.backend.security.JwtService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.licenta.backend.entity.User;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private static final Logger logger = LoggerFactory.getLogger(UserService.class);



    public SigninResponseDto signin(SigninRequestDto request) {

        logger.error("Signin request: {}", request);

        if (!checkIfUserExists(request.getEmail())) {
            throw new UserDoNotExistException("User does not exist");
        }

        User user = userRepository.findByEmail(request.getEmail()).get();
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new WrongPasswordException("Wrong password");
        }

        return SigninResponseDto.builder()
                .token(jwtService.generateToken(user))
                .build();
    }

    public RegisterResponseDto register(RegisterRequestDto request) {
        if (checkIfUserExists(request.getEmail())) {
            throw new UserAlreadyExistsException("User already exists");
        }

        var newUser = new User();
        newUser.setEmail(request.getEmail());
        newUser.setPassword(passwordEncoder.encode(request.getPassword()));
        newUser.setFirstname(request.getFirstName());
        newUser.setLastname(request.getLastName());
        newUser.setRole(Role.USER);

        userRepository.save(newUser);

        return RegisterResponseDto.builder()
                .token(jwtService.generateToken(newUser))
                .build();
    }

    public boolean checkIfUserExists(String email) {
        return userRepository.findByEmail(email).isPresent();
    }
}
