package com.certification.security;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.certification.service.CustomUserDetailsService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

	@Autowired
	private JwtUtil jwtUtil;

	@Autowired
	private CustomUserDetailsService userDetailsService;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
	        throws ServletException, IOException {

	    String path = request.getRequestURI();

	    // Skip JWT filter for public and Swagger endpoints
	    if (path.startsWith("/api/auth/register") ||
	        path.startsWith("/api/auth/login") ||
	        path.startsWith("/v3/api-docs") ||
	        path.startsWith("/swagger-ui") ||
	        path.startsWith("/swagger-ui.html")) {
	        filterChain.doFilter(request, response);
	        return;
	    }

	    final String authHeader = request.getHeader("Authorization");
	    String username = null;
	    String jwt = null;

	    if (authHeader != null && authHeader.startsWith("Bearer ")) {
	        jwt = authHeader.substring(7);
	        username = jwtUtil.getUsernameFromToken(jwt);
	    }

	    if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
	        var userDetails = userDetailsService.loadUserByUsername(username);
	        if (jwtUtil.validateToken(jwt)) {
	            var authToken = new UsernamePasswordAuthenticationToken(userDetails, null,
	                    userDetails.getAuthorities());
	            authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
	            SecurityContextHolder.getContext().setAuthentication(authToken);
	            request.setAttribute("username", username);
	            System.out.println("Authenticated User: " + username);
	            System.out.println("Authorities: " + userDetails.getAuthorities());
	        }
	    }

	    filterChain.doFilter(request, response);
	}
}