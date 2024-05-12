package com.licenta.backend.dto.user.request;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequestDto {
    private String email;
    private String phone;
    private String password;
    private String firstname;
    private String lastname;

}
