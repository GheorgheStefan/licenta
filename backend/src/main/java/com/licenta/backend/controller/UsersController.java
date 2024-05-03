package com.licenta.backend.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.licenta.backend.dto.user.request.ChangePasswordRequestDto;
import com.licenta.backend.dto.user.request.RegisterRequestDto;
import com.licenta.backend.dto.user.request.ResetUserPasswordRequestDto;
import com.licenta.backend.dto.user.request.SigninRequestDto;
import com.licenta.backend.dto.user.response.RegisterResponseDto;
import com.licenta.backend.dto.user.response.SigninResponseDto;
import com.licenta.backend.entity.Role;
import com.licenta.backend.entity.User;
import com.licenta.backend.repository.UserRepository;
import com.licenta.backend.service.UserService;
import com.licenta.backend.service.utils.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UsersController {
    private final UserRepository userRepository;
    private final UserService userService;
    private final EmailService emailService;

    @PostMapping("/signin")
    public ResponseEntity<SigninResponseDto> signin(
            @RequestBody SigninRequestDto request) {
        return ResponseEntity.ok(userService.signin(request));
    }

    @PostMapping("/register")
    public ResponseEntity<RegisterResponseDto> register(
            @RequestBody RegisterRequestDto request) {
        RegisterResponseDto response = userService.register(request);
        String link = "http://localhost:4200/activate/" + response.getToken();
        emailService.sendVerifyEmail(response.getEmail(), link);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/all")
    public List<User> getAllProducts() {
        return userRepository.findAll();
    }

    @GetMapping("/{mail}")
    public User getUserByMail(@PathVariable String mail){
        return userService.findUserByEmail(mail);
    }

    @GetMapping()
    public List<User> getAllUsers(){
        return userService.findAllUsers();
    }

    @PutMapping("/changeRole/{id}")
    public User changeRole(@PathVariable Long id, @RequestBody String requestBody) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            Map<String, String> jsonMap = mapper.readValue(requestBody, new TypeReference<Map<String, String>>() {
            });

            String roleValue = jsonMap.get("role");

            Role newRole = Role.valueOf(roleValue.toUpperCase());

            return userService.changeRole(id, newRole);
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    @GetMapping("/activate/{token}")
    public ResponseEntity<Void> updateUser(@PathVariable String token){
        userService.activateUser(token);
        return ResponseEntity.ok().build();
    }
    @PutMapping("/sendMailResetPassword")
    public ResponseEntity<Void> sendMailResetPassword(@RequestBody ResetUserPasswordRequestDto requestBody){
        userService.sendMailResetPassword(requestBody);
        return ResponseEntity.ok().build();
    }
    @PutMapping("/reset-password/{id}")
    public ResponseEntity<Void> resetPassword(@PathVariable Long id, @RequestBody ChangePasswordRequestDto requestDto){
        userService.resetPassword(id, requestDto);
        return ResponseEntity.ok().build();
    }

}
