package com.certification.repository;

import com.certification.model.CertificationGoal;
import com.certification.model.GoalStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;

public interface CertificationGoalRepository extends JpaRepository<CertificationGoal, Long> {

    List<CertificationGoal> findByEmployee_UsernameOrderByCreatedAtDesc(String username);

    List<CertificationGoal> findByStatusInAndTargetDate(List<GoalStatus> statuses, LocalDate targetDate);

    //fetch join to avoid LazyInitialization in scheduler
    @Query("""
           select g
           from CertificationGoal g
             join fetch g.certification c
             join fetch g.employee e
           where g.status in :statuses
             and g.targetDate = :targetDate
           """)
    List<CertificationGoal> findActiveDueGoalsWithJoins(
            @Param("statuses") Collection<GoalStatus> statuses,
            @Param("targetDate") LocalDate targetDate);
}
