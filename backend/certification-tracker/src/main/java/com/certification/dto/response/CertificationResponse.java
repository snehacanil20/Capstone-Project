package com.certification.dto.response;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CertificationResponse {
    private Long id;
    private String name;
    private String authority;
    private String category;
    private String subcategory;
    private int validityMonths;
    private String prerequisites;
}