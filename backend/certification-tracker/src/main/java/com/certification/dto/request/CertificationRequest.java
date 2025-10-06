package com.certification.dto.request;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CertificationRequest {

    @NotBlank
    @Size(max = 150)
    private String name;

    @NotBlank
    @Size(max = 100)
    private String authority;

    @NotBlank
    @Size(max = 100)
    private String category;
    
    @Size(max = 100)
    private String subcategory;


    @Min(1)
    @Max(120)
    private int validityMonths;

    @Size(max = 200)
    private String prerequisites;
}