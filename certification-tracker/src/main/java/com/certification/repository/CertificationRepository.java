package com.certification.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.certification.model.Certification;

public interface CertificationRepository extends JpaRepository<Certification, Long> {

	Optional<Certification> findByName(String name);

	boolean existsByName(String name);

}