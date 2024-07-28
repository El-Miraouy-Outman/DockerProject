package com.elmiraouy.jwtsecurity.Dto.response;


import com.elmiraouy.jwtsecurity.entities.Comment;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Collection;
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AppUserResponseDto {
    private Long id;
    private  String firstName;
    private  String lastName;
    private  String email;
    private  String accessToken;
    private  String refreshToken;
    private  String address;
    private  String telephone;
    private  String ville;
    private  String roles;
    private Collection<Comment> comments;

    public AppUserResponseDto(Long id, String firstName, String lastName, String email,
                              String address, String telephone, String ville, String roles,Collection<Comment> comments) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.address = address;
        this.telephone = telephone;
        this.ville = ville;
        this.roles = roles;
        this.comments=comments;
    }
    public AppUserResponseDto(Long id, String firstName, String lastName, String email,
                              String address, String telephone, String ville,Collection<Comment> comments) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.address = address;
        this.telephone = telephone;
        this.ville = ville;

        this.comments=comments;
    }


    public AppUserResponseDto(Long id, String firstName, String lastName,
                              String email, String address, String telephone, String ville,String roles) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.address = address;
        this.telephone = telephone;
        this.ville = ville;
        this.roles=roles;
    }

}
