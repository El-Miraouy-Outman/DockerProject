package com.elmiraouy.jwtsecurity.Dto.response;

import com.elmiraouy.jwtsecurity.entities.AppUser;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TokenResponseDto {

    protected Long id;
    private String token;
    private boolean expired;
    private boolean revoked;

}
