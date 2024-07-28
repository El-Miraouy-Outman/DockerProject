package com.elmiraouy.jwtsecurity.service;

import com.elmiraouy.jwtsecurity.Dto.request.TicketRequestDto;
import com.elmiraouy.jwtsecurity.Dto.response.TicketResponseDto;
import com.elmiraouy.jwtsecurity.entities.*;
import com.elmiraouy.jwtsecurity.handlerException.EntityNotFound;
import com.elmiraouy.jwtsecurity.handlerException.TicketException;
import com.elmiraouy.jwtsecurity.mappers.CustomerDtoMapper;
import com.elmiraouy.jwtsecurity.mappers.TicketDtoMapper;
import com.elmiraouy.jwtsecurity.repository.AppUserRepository;
import com.elmiraouy.jwtsecurity.repository.CommentRepository;
import com.elmiraouy.jwtsecurity.repository.CustomerRepository;
import com.elmiraouy.jwtsecurity.repository.TicketRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TicketServiceImpl implements TicketService {
    private final TicketRepository ticketRepository;
    private final TicketDtoMapper ticketDtoMapper;
    private final CustomerRepository customerRepository;
    private final CustomerDtoMapper customerDtoMapper;
    private final AppUserService userService;
    private final AppUserRepository userRepository;
    private final CommentRepository commentRepository;

    @Override
    public List<TicketResponseDto> findAll() {
        return ticketRepository.findAll()
                .stream().map(ticketDtoMapper).collect(Collectors.toList());
    }

    @Override
    public TicketResponseDto findTicketByEmailCustomer(String email) {
        return null;
    }

    @Override
    public TicketResponseDto findById(Long id) {
       Ticket ticket= ticketRepository.findById(id).orElseThrow(
                ()-> new EntityNotFound("Ticket with [%s]  Not Found ".formatted(id)));
         return ticketDtoMapper.apply(ticket);
    }

    @Override
    public TicketResponseDto add(TicketRequestDto ticketRequestDto) {
        Ticket ticket=new Ticket();

        AppUser appUser = userRepository.findById(ticketRequestDto.getCreateUserId())
                .orElseThrow(() -> new EntityNotFound(
                        "User With id [%s] not found".formatted(ticketRequestDto.getCreateUserId())));

        Customer customer= customerRepository.findById(ticketRequestDto.getCustomerId())
                .orElseThrow(() -> new EntityNotFound(
                        "Customer With id [%s] not found".formatted(ticketRequestDto.getCustomerId()))
        );

        ticketRequestDto.setStatus(StatusTicket.WAITING);
        ticketRequestDto.setPriority(ticketRequestDto.getPriority());
        ticket.setCreationDate(new Date());
        ticket.setDescription(ticketRequestDto.getDescription());
        ticket.setAssociateUserId(ticket.getAssociateUserId());
        ticket.setSubject(ticketRequestDto.getSubject());

        ticket.setPriority(ticketRequestDto.getPriority());
        ticket =ticketDtoMapper.tickerRequestDtoToTicket(ticketRequestDto);

        ticket.setCreationDate(new Date());
        ticket.setUpdateDate(null);
        ticket.setClosureDate(null);
        ticket.setUser(appUser);
        ticket.setCustomer(customer);

        ticket=ticketRepository.save(ticket);
        System.out.println(ticket.getUser().getEmail());
        System.out.println(ticket.getCustomer().getEmail());

        customer.getTickets().add(ticket);
        customerRepository.save(customer);

        appUser.getTickets().add(ticket);
        userRepository.save(appUser);

        return ticketDtoMapper.apply(ticket);

    }

    @Override
    public TicketResponseDto delete(Long id) {
        TicketResponseDto ticketById = findById(id);
        ticketRepository.deleteById(id);
        return ticketById;
    }

    @Override
    public TicketResponseDto update(Long id, TicketRequestDto TicketRequestDto) throws TicketException {
        return null;
    }

    @Override
    public Ticket addCommentToTicket(Long idTicket, Comment comment) {
        Ticket ticket = ticketRepository.findById(idTicket).orElseThrow(() -> new EntityNotFound(
                "Customer With id [%s] not found".formatted(idTicket))
        );
        ticket.getComments().add(comment);
        return ticketRepository.save(ticket);
    }
}
