package com.elmiraouy.jwtsecurity.service;

import com.elmiraouy.jwtsecurity.Dto.request.TicketRequestDto;
import com.elmiraouy.jwtsecurity.Dto.response.TicketResponseDto;
import com.elmiraouy.jwtsecurity.entities.Comment;
import com.elmiraouy.jwtsecurity.entities.Ticket;
import com.elmiraouy.jwtsecurity.handlerException.TicketException;

import java.util.List;

public interface TicketService {
    public List<TicketResponseDto> findAll();
    public TicketResponseDto findTicketByEmailCustomer(String email) throws TicketException;
    public TicketResponseDto findById(Long id) throws TicketException;
    public TicketResponseDto add(TicketRequestDto TicketRequestDto);
    public TicketResponseDto delete(Long id);
    public TicketResponseDto update(Long id , TicketRequestDto TicketRequestDto) throws TicketException;
    public Ticket addCommentToTicket(Long idTicket, Comment comment);
}
