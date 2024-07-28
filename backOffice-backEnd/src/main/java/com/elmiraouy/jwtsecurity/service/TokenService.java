package com.elmiraouy.jwtsecurity.service;

import com.elmiraouy.jwtsecurity.entities.Token;

public interface TokenService {
    public Token addToken(Token token);
    public Token findTokenByUserId(Long id);
}
