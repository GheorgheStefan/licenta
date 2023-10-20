package com.licenta.backend.dto.signin;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DtoSignupRequest {
    // what I have in the database
    private String email;
    private String password;
    private String firstname;
    private String lastname;


}
