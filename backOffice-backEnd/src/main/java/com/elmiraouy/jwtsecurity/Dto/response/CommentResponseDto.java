package com.elmiraouy.jwtsecurity.Dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.Date;
@Builder
@Data
@AllArgsConstructor
public class CommentResponseDto{

    Long id ;
    String text ;
    Date dateCreation;
    String userName;
    String userImageUrl;

}
