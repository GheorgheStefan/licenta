package com.licenta.backend.service;

import com.licenta.backend.dto.user.request.*;
import com.licenta.backend.dto.user.response.RegisterResponseDto;
import com.licenta.backend.dto.user.response.SigninResponseDto;
import com.licenta.backend.dto.user.response.UserEditResponseDto;
import com.licenta.backend.entity.Role;
import com.licenta.backend.exceptions.UserAlreadyExistsException;
import com.licenta.backend.exceptions.UserDoNotExistException;
import com.licenta.backend.exceptions.WrongPasswordException;
import com.licenta.backend.repository.UserRepository;
import com.licenta.backend.security.JwtService;
import com.licenta.backend.service.utils.EmailService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.licenta.backend.entity.User;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private static final Logger logger = LoggerFactory.getLogger(UserService.class);
    private final EmailService emailService;



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
                .enabled(user.getEnabled())
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
        newUser.setFirstname(request.getFirstname());
//        logger.info("Firstname: {}", request.getFirstname());
        newUser.setLastname(request.getLastname());
        newUser.setPhone(request.getPhone());
        newUser.setEnabled(false);
        newUser.setRole(Role.BUYER);

        userRepository.save(newUser);

        return RegisterResponseDto.builder()
                .token(jwtService.generateToken(newUser))
                .userId(newUser.getId())
                .email(newUser.getEmail())
                .build();
    }

    public boolean checkIfUserExists(String email) {
        return userRepository.findByEmail(email).isPresent();
    }
    public User findUserByEmail(String email) {
        Optional<User> userOptional = userRepository.findByEmail(email);
        return userOptional.orElse(null);
    }
    public User findUserById(Long id) {
        Optional<User> userOptional = userRepository.findById(id);
        return userOptional.orElse(null);
    }

    public List<User> findAllUsers() {
        return userRepository.findAll();
    }

    public User changeRole(Long id, Role role) {
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setRole(role);
            userRepository.save(user);
            return user;
        }
        return null;
    }

    public void activateUser(String token) {
        String email = jwtService.extractEmail(token);
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setEnabled(true);
            userRepository.save(user);
        }
    }

    public void sendMailResetPassword(ResetUserPasswordRequestDto requestBody) {
        Optional<User> userOptional = userRepository.findByEmail(requestBody.getEmail());
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            String link = "http://localhost:4200/reset-password/" + user.getId();
            emailService.sendResetPasswordEmail(user.getEmail(), link, user.getFirstname(), user.getLastname());
        }
    }

    public void resetPassword(Long id, ChangePasswordRequestDto requestDto) {
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setPassword(passwordEncoder.encode(requestDto.getNewPassword()));
            userRepository.save(user);
        }
    }

    public UserEditResponseDto updateUser(UserEditRequestDto request) {
        Optional<User> userOptional = userRepository.findById(request.getId());
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setPhone(request.getPhone());
            user.setEmail(request.getEmail());
            user.setFirstname(request.getFirstname());
            user.setLastname(request.getLastname());
            userRepository.save(user);
            return UserEditResponseDto.builder()
                    .id(user.getId())
                    .build();
        }
        return null;
    }
}
