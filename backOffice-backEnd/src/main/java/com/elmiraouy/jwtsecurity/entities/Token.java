package com.elmiraouy.jwtsecurity.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Token {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Long id;
    @Column
    private String accessToken;
    private String refreshToken;
    private boolean expired;
    private boolean revoked;
    @OneToOne(mappedBy = "token")
    @JoinColumn(name = "user_id")
    private AppUser appUser;
}
