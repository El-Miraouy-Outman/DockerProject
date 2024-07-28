package com.elmiraouy.jwtsecurity.entities;

import jakarta.persistence.*;
import lombok.*;
import java.util.Collection;

@Entity
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "hubs")
public class Hub {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id ;
    @ManyToMany
    private Collection<AppUser> users;
    @ManyToMany(mappedBy = "hubs")
    private Collection<Customer> customers;
}
