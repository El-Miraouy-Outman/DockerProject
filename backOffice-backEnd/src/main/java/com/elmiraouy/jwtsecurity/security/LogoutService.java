package com.elmiraouy.jwtsecurity.security;

import com.elmiraouy.jwtsecurity.entities.Token;
import com.elmiraouy.jwtsecurity.repository.TokenRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.stereotype.Service;
@Service
@RequiredArgsConstructor
public class LogoutService implements LogoutHandler {
    private final TokenRepository tokenRepository;
    @Override
    public void logout(
            HttpServletRequest request,
            HttpServletResponse response,
             Authentication authentication) {
        final String authHeader =request.getHeader("Authorization");
        final String jwt;
        System.out.println("*******logout *********"+authHeader);
        if(authHeader == null  || !authHeader.startsWith("Bearer ")){
            System.out.println("*******not Bearer*********");
            return;
        }
        jwt=authHeader.substring(7);

        Token storedToken =tokenRepository.findTokenByAccessToken(jwt);
        if(storedToken != null){
            System.out.println("token  est logout :");
            storedToken.setExpired(true);
            storedToken.setRevoked(true);
            tokenRepository.save(storedToken);
        }
    }
}
