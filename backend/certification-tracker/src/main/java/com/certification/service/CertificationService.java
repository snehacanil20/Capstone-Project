package com.certification.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.certification.dto.request.CertificationRequest;
import com.certification.exception.ConflictException;
import com.certification.model.Certification;
import com.certification.repository.CertificationRepository;

@Service
public class CertificationService {

    private final CertificationRepository repo;

    public CertificationService(CertificationRepository repo) {
        this.repo = repo;
    }

    public List<Certification> getAll() {
        return repo.findAll();
    }

    public Certification getById(Long id) {
        return repo.findById(id).orElseThrow(() -> new ConflictException("Certification not found: " + id));
    }

    @Transactional
    public Certification create(CertificationRequest req) {
        if (repo.existsByName(req.getName())) {
            throw new IllegalArgumentException("Certification with the same name already exists.");
        }

        Certification cert = Certification.builder()
                .name(req.getName())
                .authority(req.getAuthority())
                .category(req.getCategory())
                .subcategory(req.getSubcategory())
                .validityMonths(req.getValidityMonths())
                .prerequisites(req.getPrerequisites())
                .build();

        return repo.save(cert);
    }

    @Transactional
    public Certification update(Long id, CertificationRequest req) {
        Certification existing = getById(id);
        if (!existing.getName().equalsIgnoreCase(req.getName()) && repo.existsByName(req.getName())) {
            throw new ConflictException("Another certification with the same name exists.");
        }

        existing.setName(req.getName());
        existing.setAuthority(req.getAuthority());
        existing.setCategory(req.getCategory());
        existing.setSubcategory(req.getSubcategory());
        existing.setValidityMonths(req.getValidityMonths());
        existing.setPrerequisites(req.getPrerequisites());

        return repo.save(existing);
    }

    @Transactional
    public void delete(Long id) {
        Certification existing = getById(id);
        repo.delete(existing);
    }
}