package com.elmiraouy.jwtsecurity.mail;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class MailStructure {
    private String email;
    private  String subject ;
    private String message ;

}
