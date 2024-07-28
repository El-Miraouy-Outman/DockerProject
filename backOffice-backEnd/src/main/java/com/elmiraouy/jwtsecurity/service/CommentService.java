package com.elmiraouy.jwtsecurity.service;

import com.elmiraouy.jwtsecurity.Dto.request.CommentRequestDto;
import com.elmiraouy.jwtsecurity.Dto.response.CommentResponseDto;
import com.elmiraouy.jwtsecurity.entities.Comment;

import java.util.List;

public interface CommentService {
    public List<CommentResponseDto> findAllComment();
    public List<CommentResponseDto> findCommentByTicket(Long ticketId);
    public Comment findById(Long id) ;
    public CommentResponseDto add(CommentRequestDto commentRequestDto);
    public Comment delete(Long id);
    public CommentResponseDto update(Long id , Comment comment) ;
}
