package com.elmiraouy.jwtsecurity.controller;

import com.elmiraouy.jwtsecurity.Dto.request.TicketRequestDto;
import com.elmiraouy.jwtsecurity.Dto.response.TicketResponseDto;
import com.elmiraouy.jwtsecurity.service.TicketService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
@RequestMapping("/api/tickets")
public class TicketController {
    private final TicketService ticketService;

    @GetMapping
    public ResponseEntity<List<TicketResponseDto>> findAllTicket( )  {
        return ResponseEntity.ok(ticketService.findAll());
    }
    @PostMapping
    public ResponseEntity<?> addTicket(
            @RequestBody TicketRequestDto ticketRequestDto)  {
        return ResponseEntity.ok(ticketService.add(ticketRequestDto));
    }
    @DeleteMapping
    public ResponseEntity<TicketResponseDto> deleteTicket(
            @Param("id") Long id)  {
        return ResponseEntity.ok(ticketService.delete(id));
    }

}
