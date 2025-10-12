package com.certification.dto.request;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class GoalCreateRequest {
    @NotNull
    private Long certificationId;

    @NotNull
    @Future(message = "Target date must be in the future")
    private java.time.LocalDate targetDate;

    @Size(max = 500)
    private String notes;
}