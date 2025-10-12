package com.certification.config;

import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.OpenAPI;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {
	@Bean
	public OpenAPI openAPI() {
	    System.out.println("OpenAPI bean initialized");
	    return new OpenAPI()
	        .info(new Info()
	            .title("Certification Tracker API")
	            .description("Week 1 - Username-based Auth + Catalog")
	            .version("v1.0"));
	}

}