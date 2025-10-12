package com.certification.dto.response;

import com.certification.model.SubmissionStatus;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class SubmissionResponse {

    private Long id;
    private Long goalId;
    private String credentialId;
    private String authority;
    private LocalDate dateEarned;
    private LocalDate validThrough;
    private String filePath;
    private SubmissionStatus status;
    private String approverName;
    private String comments;
}