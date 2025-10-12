package com.certification.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "certification_submissions", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"credentialId", "authority", "dateEarned"})
})
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CertificationSubmission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "goal_id", nullable = false)
    private CertificationGoal goal;

    @NotBlank
    @Column(nullable = false, length = 100)
    private String credentialId;

    @NotBlank
    @Column(nullable = false, length = 100)
    private String authority;

    @NotNull
    @Column(nullable = false)
    private LocalDate dateEarned;

    @NotNull
    @Column(nullable = false)
    private LocalDate validThrough;

    @Column(nullable = false)
    private String filePath;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private SubmissionStatus status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "approver_id")
    private User approver;

    @Size(max = 500)
    private String comments;
}