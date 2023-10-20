package com.licenta.backend.dto.login;

import com.licenta.backend.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DtoLoginResponse {
    private Integer id;
    private String email;
    private Role role;
    private String firstname;
    private String lastname;

}
