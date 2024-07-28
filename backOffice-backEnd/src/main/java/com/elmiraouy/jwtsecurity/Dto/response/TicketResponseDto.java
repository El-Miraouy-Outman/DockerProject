package com.elmiraouy.jwtsecurity.Dto.response;

import com.elmiraouy.jwtsecurity.entities.Comment;
import com.elmiraouy.jwtsecurity.entities.PriorityTicket;
import com.elmiraouy.jwtsecurity.entities.StatusTicket;
import lombok.Builder;

import java.util.Collection;
import java.util.Date;
import java.util.List;

@Builder
public record TicketResponseDto(
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
        String finalSolution,
       // Collection<Comment> comments,
        String userName,
        String customerName
        //, Long resolution_id,
        // Long customer_id
) {

}
