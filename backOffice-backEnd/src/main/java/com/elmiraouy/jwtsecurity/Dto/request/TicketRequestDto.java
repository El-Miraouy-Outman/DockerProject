package com.elmiraouy.jwtsecurity.Dto.request;

import com.elmiraouy.jwtsecurity.entities.Comment;
import com.elmiraouy.jwtsecurity.entities.PriorityTicket;
import com.elmiraouy.jwtsecurity.entities.StatusTicket;
import lombok.Builder;
import lombok.Data;

import java.util.Collection;
import java.util.Date;
import java.util.List;

@Data
@Builder

public class TicketRequestDto
{
    private Long id ;
    private Long createUserId ;
    private Long updateUserId ;
    private Long associateUserId ;
    private String subject ;
    private String description;
    private StatusTicket status;
    private PriorityTicket priority;
    private Date creationDate;
    private Date updateDate;
    private Date closureDate;
    private String finalSolution;
    private Long resolutionId;
    private Long customerId;
    private String customerEmail;
    private Collection<Comment> comments;


}
