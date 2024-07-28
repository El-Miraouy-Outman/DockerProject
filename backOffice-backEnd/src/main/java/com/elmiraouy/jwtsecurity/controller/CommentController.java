package com.elmiraouy.jwtsecurity.controller;

import com.elmiraouy.jwtsecurity.Dto.request.CommentRequestDto;
import com.elmiraouy.jwtsecurity.Dto.response.CommentResponseDto;
import com.elmiraouy.jwtsecurity.entities.Comment;
import com.elmiraouy.jwtsecurity.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
@RequestMapping("/api/tickets/comments")
public class CommentController {
    private final CommentService commentService;

    @GetMapping
    public ResponseEntity<List<CommentResponseDto>> findAllComments( )  {
        return ResponseEntity.ok(commentService.findAllComment());
    }
    @GetMapping("/byTicket")
    public ResponseEntity<List<CommentResponseDto>> findCommentsByTickets(
            @RequestParam(name = "idTicket",required = true) Long idTicket
    )  {
        return ResponseEntity.ok(commentService.findCommentByTicket(idTicket));
    }
    @PostMapping
    public ResponseEntity<CommentResponseDto> addComment(
            @RequestBody CommentRequestDto commentRequestDto)  {
        return ResponseEntity.ok(commentService.add(commentRequestDto));
    }
    @DeleteMapping
    public ResponseEntity<Comment> deleteComment(
            @Param("id") Long id)  {
        return ResponseEntity.ok(commentService.delete(id));
    }

}
