package com.certification.security;

import java.security.Key;
import java.util.Date;

import org.springframework.stereotype.Component;

import com.certification.model.Role;

import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {

	private final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
	private final long jwtExpirationMs = 24 * 60 * 60 * 1000; // 24 hours

	public String generateToken(String username, Long userId, Role role) {
		return Jwts.builder()
				.setSubject(username)
				.claim("id", userId)
				.claim("role", role)
				.setIssuedAt(new Date())
				.setExpiration(new Date(System.currentTimeMillis() + jwtExpirationMs))
				.signWith(key)
				.compact();
	}

	public String getUsernameFromToken(String token) {
		return Jwts.parserBuilder()
				.setSigningKey(key)
				.build()
				.parseClaimsJws(token)
				.getBody()
				.getSubject();
	}

	public boolean validateToken(String token) {
		try {
			Jwts.parserBuilder()
			.setSigningKey(key)
			.build()
			.parseClaimsJws(token);

			return true;
		} catch (JwtException | IllegalArgumentException e) {
			// log or handle invalid token
			return false;
		}
	}
}
