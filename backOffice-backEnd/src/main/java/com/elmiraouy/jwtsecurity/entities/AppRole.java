package com.elmiraouy.jwtsecurity.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.util.Collection;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class AppRole {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Long id ;
    @Column
    private String roleName;
    @Column
    private String code;
    @OneToMany(mappedBy = "appRole",fetch = FetchType.EAGER)
    @JsonIgnore
    private Collection<AppUser> users;
}
