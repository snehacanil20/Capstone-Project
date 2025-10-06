package com.certification.controller;

import java.security.Principal;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.certification.dto.request.GoalCreateRequest;
import com.certification.dto.request.GoalUpdateRequest;
import com.certification.dto.request.ProgressUpdateRequest;
import com.certification.dto.response.GoalResponse;
import com.certification.service.GoalService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/goals")
public class GoalController {

    private final GoalService service;

    public GoalController(GoalService service) {
        this.service = service;
    }

    @PostMapping
    @PreAuthorize("hasRole('EMPLOYEE')")
    public ResponseEntity<GoalResponse> create(Principal principal,
                                               @Valid @RequestBody GoalCreateRequest req) {
        return ResponseEntity.ok(service.createGoal(principal.getName(), req));
    }

    @GetMapping("/my")
    @PreAuthorize("hasAnyRole('EMPLOYEE','MANAGER','APPROVER','ADMIN')")
    public ResponseEntity<List<GoalResponse>> myGoals(Principal principal) {
        return ResponseEntity.ok(service.listMyGoals(principal.getName()));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('EMPLOYEE','MANAGER','APPROVER','ADMIN')")
    public ResponseEntity<GoalResponse> getMine(Principal principal, @PathVariable Long id) {
        return ResponseEntity.ok(service.getMine(principal.getName(), id));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('EMPLOYEE')")
    public ResponseEntity<GoalResponse> update(Principal principal,
                                               @PathVariable Long id,
                                               @Valid @RequestBody GoalUpdateRequest req) {
        return ResponseEntity.ok(service.updateGoal(principal.getName(), id, req));
    }

    @PatchMapping("/{id}/progress")
    @PreAuthorize("hasRole('EMPLOYEE')")
    public ResponseEntity<GoalResponse> progress(Principal principal,
                                                 @PathVariable Long id,
                                                 @Valid @RequestBody ProgressUpdateRequest req) {
        return ResponseEntity.ok(service.updateProgress(principal.getName(), id, req));
    }
}