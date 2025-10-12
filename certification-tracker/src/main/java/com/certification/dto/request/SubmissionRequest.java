package com.certification.dto.request;

import jakarta.validation.constraints.*;
import lombok.Data;

import java.time.LocalDate;

@Data
public class SubmissionRequest {

    @NotNull
    private Long goalId;

    @NotBlank
    private String credentialId;

    @NotBlank
    private String authority;

    @NotNull
    private LocalDate dateEarned;

    @NotNull
    private LocalDate validThrough;

    @NotNull
    private String filePath;
}