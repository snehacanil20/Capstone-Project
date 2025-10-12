package com.certification.controller;

import com.certification.service.FileStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/files")
public class FileUploadController {

	@Autowired
	private FileStorageService fileStorageService;

	@PostMapping("/upload")
	@PreAuthorize("hasRole('EMPLOYEE')")
	public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) throws IOException {
		String filename = fileStorageService.storeFile(file);
		return ResponseEntity.ok(filename);
	}
}