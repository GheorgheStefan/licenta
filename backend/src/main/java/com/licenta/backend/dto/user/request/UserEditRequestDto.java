package com.licenta.backend.dto.user.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserEditRequestDto {
    private String phone;
    private Long id;
    private String firstname;
    private String lastname;
    private String email;
}
