package com.elmiraouy.jwtsecurity.mail;

import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service@RequiredArgsConstructor
public class MailService {
    private  final JavaMailSender javaMailSender;
    @Value("${spring.mail.username}")
    private String fromMail;
    public void sendMail(MailStructure mailStructure){
        SimpleMailMessage simpleMailMessage =new SimpleMailMessage();
        simpleMailMessage.setFrom(fromMail);
        simpleMailMessage.setSubject(mailStructure.getSubject());
        simpleMailMessage.setText(mailStructure.getMessage());
        simpleMailMessage.setTo(mailStructure.getEmail());
        System.out.println("email : "+mailStructure.getEmail()+" subject : "+mailStructure.getSubject()+"" +
                " message : "+mailStructure.getMessage());
        javaMailSender.send(simpleMailMessage);
    }

    public MailStructure confirmedEmail(String destination,String uuid) {
        return MailStructure
                .builder()
                .subject("VERVE : Confirmation de votre Email :")
                .message("voici votre code :" + uuid + " ce code sera expire dans 3 min ")
                .email(destination)
                .build();
    }
}
