package com.certification.controller;

import com.certification.dto.request.ApprovalRequest;
import com.certification.dto.request.SubmissionRequest;
import com.certification.dto.response.SubmissionResponse;
import com.certification.service.SubmissionService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/submissions")
public class SubmissionController {

    private final SubmissionService service;

    public SubmissionController(SubmissionService service) {
        this.service = service;
    }

    @PostMapping
    @PreAuthorize("hasRole('EMPLOYEE')")
    public ResponseEntity<SubmissionResponse> submitEvidence(Principal principal,
                                                             @Valid @RequestBody SubmissionRequest req) {
        return ResponseEntity.ok(service.submitEvidence(principal.getName(), req));
    }

    @GetMapping("/my")
    @PreAuthorize("hasRole('EMPLOYEE')")
    public ResponseEntity<List<SubmissionResponse>> mySubmissions(Principal principal) {
        return ResponseEntity.ok(service.getMySubmissions(principal.getName()));
    }

    @GetMapping("/pending")
    @PreAuthorize("hasRole('APPROVER')")
    public ResponseEntity<List<SubmissionResponse>> pendingApprovals(Principal principal) {
        return ResponseEntity.ok(service.getPendingApprovals(principal.getName()));
    }

    @PostMapping("/{id}/decision")
    @PreAuthorize("hasRole('APPROVER')")
    public ResponseEntity<SubmissionResponse> approveOrReject(Principal principal,
                                                              @PathVariable Long id,
                                                              @Valid @RequestBody ApprovalRequest req) {
        return ResponseEntity.ok(service.approveOrReject(principal.getName(), id, req));
    }
}