package com.elmiraouy.jwtsecurity.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;

@Entity
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Ticket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id ;
    private Long updateUserId ;
    private Long associateUserId ;
    private String subject ;
    private String description;
    @Enumerated(EnumType.STRING)
    private StatusTicket status;
    @Enumerated(EnumType.STRING)
    private PriorityTicket priority;
    private Date creationDate;
    private Date updateDate;
    private Date closureDate;
    private String finalSolution;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private AppUser user;
    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;
    @ManyToOne
    @JoinColumn(name = "resolution_id")
    private ResolutionProblem resolutionProblem;
    @OneToMany(mappedBy = "ticket")
    @JsonIgnore
    private Collection<Comment> comments;

    public Ticket(
            Long id,
            Long updateUserId,
            Long associateUserId,
            String subject,
            String description,
            StatusTicket status,
            PriorityTicket priority,
            Date creationDate,
            Date updateDate,
            Date closureDate,
            String finalSolution
    ) {
        this.id = id;
        this.updateUserId = updateUserId;
        this.associateUserId = associateUserId;
        this.subject = subject;
        this.description = description;
        this.status = status;
        this.priority = priority;
        this.creationDate = creationDate;
        this.updateDate = updateDate;
        this.closureDate = closureDate;
        this.finalSolution = finalSolution;
    }


}
