package com.elmiraouy.jwtsecurity.mail;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/mail")
@RequiredArgsConstructor
public class MailController {
    private final MailService mailService;
    @PostMapping("/sendMail")
    public String sendMail( @RequestBody MailStructure mailStructure){
         mailService.sendMail(mailStructure);
         return "Successfully ";
    }
}
