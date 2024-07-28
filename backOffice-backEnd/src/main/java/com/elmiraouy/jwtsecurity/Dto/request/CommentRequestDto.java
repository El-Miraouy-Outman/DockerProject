package com.elmiraouy.jwtsecurity.Dto.request;

import lombok.Builder;
import lombok.Data;

import java.util.Date;
@Data
@Builder
public class CommentRequestDto {
    private Long id ;
    private String text ;
    private Date dateCreation;
    private Long ticketId ;
    private Long userId;
}
