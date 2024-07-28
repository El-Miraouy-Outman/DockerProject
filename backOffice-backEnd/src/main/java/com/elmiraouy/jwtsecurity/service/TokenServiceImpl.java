package com.elmiraouy.jwtsecurity.service;

import com.elmiraouy.jwtsecurity.entities.Token;
import com.elmiraouy.jwtsecurity.repository.TokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TokenServiceImpl implements TokenService{
    private final TokenRepository tokenRepository;
    @Override
    public Token addToken(Token token) {
        token.setExpired(false);
        token.setRevoked(false);
        return tokenRepository.save(token);
    }

    @Override
    public Token findTokenByUserId(Long idUser) {
        return tokenRepository.findByAppUserId(idUser);
    }
}
