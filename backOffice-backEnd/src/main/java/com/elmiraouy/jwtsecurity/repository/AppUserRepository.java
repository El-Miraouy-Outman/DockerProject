package com.elmiraouy.jwtsecurity.repository;

import com.elmiraouy.jwtsecurity.entities.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AppUserRepository extends JpaRepository<AppUser,Long> {
    @Query("SELECT u FROM AppUser u WHERE lower(u.email) = lower(:email) ")
    Optional<AppUser> findByEmail(@Param("email") String email);
    Optional<AppUser> findAppUserById(Long id);

}
