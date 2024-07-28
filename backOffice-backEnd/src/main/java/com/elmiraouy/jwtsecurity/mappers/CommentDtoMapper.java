package com.elmiraouy.jwtsecurity.mappers;

import com.elmiraouy.jwtsecurity.Dto.response.CommentResponseDto;
import com.elmiraouy.jwtsecurity.entities.Comment;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class CommentDtoMapper implements Function<Comment, CommentResponseDto> {

    @Override
    public CommentResponseDto apply(Comment comment) {
        return new CommentResponseDto(
                comment.getId(),
                comment.getText(),
                comment.getDateCreation(),
                comment.getUser().getFirstName()+" "+comment.getUser().getLastName(),
                comment.getUser().getImageUrl()
        );
    }


}
