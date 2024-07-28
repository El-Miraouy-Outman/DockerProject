package com.elmiraouy.jwtsecurity.repository;

import com.elmiraouy.jwtsecurity.entities.Token;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TokenRepository extends JpaRepository<Token,Long> {
    @Query("""
           select  t from  Token t inner  join AppUser u on t.appUser.id = u.id
           where u.email = :email and (t.expired = false or t.revoked = false )
            """)
    Token findValidTokenByUser(String email);
    Token findByAppUserId(Long userId);
    Token findTokenByAccessToken(String accessToken);

}
