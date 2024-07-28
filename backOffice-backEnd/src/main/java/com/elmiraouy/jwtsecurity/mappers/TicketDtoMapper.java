package com.elmiraouy.jwtsecurity.mappers;

import com.elmiraouy.jwtsecurity.Dto.request.TicketRequestDto;
import com.elmiraouy.jwtsecurity.Dto.response.AppUserResponseDto;
import com.elmiraouy.jwtsecurity.Dto.response.TicketResponseDto;
import com.elmiraouy.jwtsecurity.entities.AppRole;
import com.elmiraouy.jwtsecurity.entities.AppUser;
import com.elmiraouy.jwtsecurity.entities.Ticket;
import org.springframework.stereotype.Service;

import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class TicketDtoMapper implements Function<Ticket, TicketResponseDto> {

    @Override
    public TicketResponseDto apply(Ticket ticket) {
        return new TicketResponseDto(
                ticket.getId(),
                ticket.getUpdateUserId(),
                ticket.getAssociateUserId(),
                ticket.getSubject(),
                ticket.getDescription(),
                ticket.getStatus(),
                ticket.getPriority(),
                ticket.getCreationDate(),
                ticket.getUpdateDate(),
                ticket.getClosureDate(),
                ticket.getFinalSolution(),
                //ticket.getComments(),
                ticket.getUser().getFirstName()+" "+ticket.getUser().getLastName(),
                ticket.getCustomer().getName()
               // , ticket.getResolutionProblem().getId(),
                //ticket.getCustomer().getId()
        );
    }
    public Ticket tickerRequestDtoToTicket(TicketRequestDto ticketRequestDto) {
        return new Ticket(
                ticketRequestDto.getId(),
                ticketRequestDto.getUpdateUserId(),
                ticketRequestDto.getAssociateUserId(),
                ticketRequestDto.getSubject(),
                ticketRequestDto.getDescription(),
                ticketRequestDto.getStatus(),
                ticketRequestDto.getPriority(),
                ticketRequestDto.getCreationDate(),
                ticketRequestDto.getUpdateDate(),
                ticketRequestDto.getClosureDate(),
                ticketRequestDto.getFinalSolution()
        );
    }

}
