package com.elmiraouy.jwtsecurity.Dto.request;

import com.elmiraouy.jwtsecurity.entities.Comment;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder

public class AppUserRequestDto
{
    private Long id ;
    private String firstName;
    private String lastName;
    private String passWord;
    private String email;
    private String address;
    private String telephone;
    private String ville;
    private String uuid;
    List<String> roles;
    private String newPassWord;
    private List<Comment> comments;

}
