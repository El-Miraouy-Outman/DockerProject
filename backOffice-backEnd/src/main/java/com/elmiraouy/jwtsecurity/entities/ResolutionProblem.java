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
public class ResolutionProblem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id ;
    private String problemDescription;
    private String resolutionDescription;
    private int number_occurrence;
    @OneToMany(mappedBy = "resolutionProblem")
    private Collection<Ticket> tickets;

}
