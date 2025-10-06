package com.certification.service;

import com.certification.dto.request.ProgressUpdateRequest;
import com.certification.model.*;
import com.certification.repository.CertificationGoalRepository;
import com.certification.repository.CertificationRepository;
import com.certification.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;

import java.time.LocalDate;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class GoalServiceTest {

    @Test
    void testUpdateProgressCompletesAt100() {
        var goalRepo = mock(CertificationGoalRepository.class);
        var certRepo = mock(CertificationRepository.class);
        var userRepo = mock(UserRepository.class);

        var svc = new GoalService(goalRepo, certRepo, userRepo);

        User u = User.builder().id(1L).username("employee").build();
        Certification c = Certification.builder().id(10L).name("Azure Fundamentals").build();

        CertificationGoal g = CertificationGoal.builder()
                .id(5L).employee(u).certification(c)
                .targetDate(LocalDate.now().plusDays(30))
                .status(GoalStatus.PLANNED).progressPercent(0).build();

        when(goalRepo.findById(5L)).thenReturn(Optional.of(g));

        ProgressUpdateRequest req = new ProgressUpdateRequest();
        req.setProgressPercent(100);

        svc.updateProgress("employee", 5L, req);

        ArgumentCaptor<CertificationGoal> cap = ArgumentCaptor.forClass(CertificationGoal.class);
        verify(goalRepo, times(1)).save(cap.capture());
        assertEquals(100, cap.getValue().getProgressPercent());
        assertEquals(GoalStatus.COMPLETED, cap.getValue().getStatus());
    }
}
