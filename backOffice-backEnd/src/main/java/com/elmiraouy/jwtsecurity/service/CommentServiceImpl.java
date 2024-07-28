package com.elmiraouy.jwtsecurity.service;

import com.elmiraouy.jwtsecurity.Dto.request.CommentRequestDto;
import com.elmiraouy.jwtsecurity.Dto.response.CommentResponseDto;
import com.elmiraouy.jwtsecurity.entities.Comment;
import com.elmiraouy.jwtsecurity.entities.Ticket;
import com.elmiraouy.jwtsecurity.handlerException.EntityNotFound;
import com.elmiraouy.jwtsecurity.mappers.CommentDtoMapper;
import com.elmiraouy.jwtsecurity.repository.CommentRepository;
import com.elmiraouy.jwtsecurity.repository.TicketRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService{
    private final CommentRepository commentRepository;
    private final TicketService ticketService;
    private final AppUserService userService;
    private final CommentDtoMapper commentDtoMapper;
    private final TicketRepository ticketRepository;
    @Override
    public List<CommentResponseDto> findAllComment() {
        return commentRepository.findAll().stream().map(commentDtoMapper).collect(Collectors.toList());
    }

    @Override
    public List<CommentResponseDto> findCommentByTicket(Long idTicket)  {
        Ticket byId = ticketRepository.findById(idTicket).orElseThrow(
                () -> new EntityNotFound("Ticket with id :[%s] not found ".formatted(idTicket))
        );
        return commentRepository.findCommentByTicket(byId).stream()
                .map(comment -> CommentResponseDto.builder()
                        .text(comment.getText())
                        .id(comment.getId())
                        .userImageUrl(comment.getUser().getImageUrl())
                        .userName(comment.getUser().getFirstName() + " " + comment.getUser().getLastName())
                        .dateCreation(comment.getDateCreation())
                        .build())
                .collect(Collectors.toList());
    }

    @Override
    public Comment findById(Long id) {
        return null;
    }

    @Override
    public CommentResponseDto add(CommentRequestDto commentRequestDto) {
        System.out.println("==================1===================");
        System.out.println(commentRequestDto.getText());
        Comment comment=Comment.builder()
                .dateCreation(new Date())
                .text(commentRequestDto.getText()).build();
        comment.setTicket(ticketService.addCommentToTicket(commentRequestDto.getTicketId(), comment));
        comment.setUser(userService.addCommentToUser(commentRequestDto.getUserId(), comment));
        Comment saveComment = commentRepository.save(comment);
        System.out.println("======================================2========");
        return CommentResponseDto.builder()
                .text(saveComment.getText())
                .userName(saveComment.getUser().getFirstName() +" "+saveComment.getUser().getLastName())
                .id(saveComment.getId())
                .dateCreation(saveComment.getDateCreation())
                .build();
    }

    @Override
    public Comment delete(Long id) {
        return null;
    }

    @Override
    public CommentResponseDto update(Long id, Comment comment) {
        return null;
    }
}
