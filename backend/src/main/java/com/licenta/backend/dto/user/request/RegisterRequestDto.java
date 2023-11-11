package com.licenta.backend.dto.user.request;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequestDto {
    String email;
    String password;
    String firstname;
    String lastname;

}
