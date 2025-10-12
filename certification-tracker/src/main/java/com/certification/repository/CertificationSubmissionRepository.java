package com.certification.repository;

import com.certification.model.CertificationSubmission;
import com.certification.model.SubmissionStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface CertificationSubmissionRepository extends JpaRepository<CertificationSubmission, Long> {

    boolean existsByCredentialIdAndAuthorityAndDateEarned(String credentialId, String authority, LocalDate dateEarned);

    List<CertificationSubmission> findByApprover_UsernameAndStatus(String approverUsername, SubmissionStatus status);

    List<CertificationSubmission> findByGoal_Employee_Username(String username);
}
