package com.licenta.backend.dto.validator;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ValidationRequestDto {
    private String courierMail;
    private String deliveryCode;
}
