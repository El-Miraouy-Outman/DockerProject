package com.elmiraouy.jwtsecurity.repository;

import com.elmiraouy.jwtsecurity.entities.AppRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AppRoleRepository extends JpaRepository<AppRole,Long> {
      // Optional<AppRole> findByRoleName(String name);
       Optional<AppRole> findByCode(String name);
}
