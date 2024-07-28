package com.elmiraouy.jwtsecurity.Dto.response;

import jakarta.persistence.Column;
import lombok.Builder;
import lombok.Data;

@Builder
public record AppRoleResponse(
         Long id ,
         String roleName,
         String code
) {
}
