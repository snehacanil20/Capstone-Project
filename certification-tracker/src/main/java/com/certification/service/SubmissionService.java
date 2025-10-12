package com.certification.service;

import com.certification.dto.request.ApprovalRequest;
import com.certification.dto.request.SubmissionRequest;
import com.certification.dto.response.SubmissionResponse;
import com.certification.exception.BadRequestException;
import com.certification.exception.ResourceNotFoundException;
import com.certification.model.*;
import com.certification.repository.*;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class SubmissionService {

    private final CertificationSubmissionRepository submissionRepo;
    private final CertificationGoalRepository goalRepo;
    private final UserRepository userRepo;

    public SubmissionService(CertificationSubmissionRepository submissionRepo,
                             CertificationGoalRepository goalRepo,
                             UserRepository userRepo) {
        this.submissionRepo = submissionRepo;
        this.goalRepo = goalRepo;
        this.userRepo = userRepo;
    }

    @Transactional
    public SubmissionResponse submitEvidence(String username, SubmissionRequest req) {
        CertificationGoal goal = goalRepo.findById(req.getGoalId())
                .orElseThrow(() -> new ResourceNotFoundException("Goal not found"));

        if (!goal.getEmployee().getUsername().equals(username)) {
            throw new BadRequestException("You can only submit evidence for your own goals");
        }

        if (submissionRepo.existsByCredentialIdAndAuthorityAndDateEarned(
                req.getCredentialId(), req.getAuthority(), req.getDateEarned())) {
            throw new BadRequestException("Duplicate submission detected");
        }
        User employee = goal.getEmployee();
        User approver = employee.getApprover();

        if (approver == null) {
            throw new BadRequestException("No approver assigned for this employee.");
        }

        CertificationSubmission submission = CertificationSubmission.builder()
            .goal(goal)
            .credentialId(req.getCredentialId())
            .authority(req.getAuthority())
            .dateEarned(req.getDateEarned())
            .validThrough(req.getValidThrough())
            .filePath(req.getFilePath())
            .status(SubmissionStatus.SUBMITTED)
            .approver(approver)
            .build();
        
        return toResponse(submissionRepo.save(submission));
    }

    public List<SubmissionResponse> getMySubmissions(String username) {
        return submissionRepo.findByGoal_Employee_Username(username)
                .stream().map(this::toResponse).toList();
    }

    public List<SubmissionResponse> getPendingApprovals(String approverUsername) {
        return submissionRepo.findByApprover_UsernameAndStatus(approverUsername, SubmissionStatus.SUBMITTED)
                .stream().map(this::toResponse).toList();
    }

    @Transactional
    public SubmissionResponse approveOrReject(String approverUsername, Long id, ApprovalRequest req) {
        CertificationSubmission submission = submissionRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Submission not found"));

        User approver = userRepo.findByUsername(approverUsername)
                .orElseThrow(() -> new ResourceNotFoundException("Approver not found"));

        submission.setApprover(approver);
        submission.setComments(req.getComments());
        submission.setStatus(req.getApproved() ? SubmissionStatus.APPROVED : SubmissionStatus.REJECTED);

        return toResponse(submissionRepo.save(submission));
    }

    private SubmissionResponse toResponse(CertificationSubmission s) {
        return SubmissionResponse.builder()
                .id(s.getId())
                .goalId(s.getGoal().getId())
                .credentialId(s.getCredentialId())
                .authority(s.getAuthority())
                .dateEarned(s.getDateEarned())
                .validThrough(s.getValidThrough())
                .filePath(s.getFilePath())
                .status(s.getStatus())
                .approverName(s.getApprover() != null ? s.getApprover().getName() : null)
                .comments(s.getComments())
                .build();
    }
}