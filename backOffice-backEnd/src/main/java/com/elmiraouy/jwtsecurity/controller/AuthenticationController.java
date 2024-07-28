package com.elmiraouy.jwtsecurity.controller;


import com.elmiraouy.jwtsecurity.Dto.request.AppUserRequestDto;
import com.elmiraouy.jwtsecurity.Dto.response.AppUserResponseDto;
import com.elmiraouy.jwtsecurity.handlerException.AppUserException;
import com.elmiraouy.jwtsecurity.security.AuthenticationService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.net.ConnectException;


// Authentification Basic

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationService authenticationService;
    @PostMapping("/auth/register")
    public ResponseEntity<AppUserResponseDto> register(
            @RequestBody AppUserRequestDto request
    ) throws AppUserException, ConnectException {
        return ResponseEntity.ok(authenticationService.register(request));
    }
    @PostMapping("/auth/authenticate")
    public ResponseEntity<AppUserResponseDto> authenticate(
           @Param("email") String email,@Param("passWord") String passWord
    ) throws AppUserException {
   return ResponseEntity.ok(authenticationService.authenticate(email,passWord));
    }
    @PostMapping("/auth/refresh")
    public ResponseEntity<AppUserResponseDto> refreshToken(
            HttpServletRequest request,
            HttpServletResponse response
    ) throws IOException {
      return  ResponseEntity.ok(authenticationService.refreshToken(request,response));
    }
    @PostMapping("/auth/confirmedEmail")
    public ResponseEntity<AppUserResponseDto> confirmedEmail(
            @RequestBody AppUserRequestDto request
    ) throws AppUserException {
        return  ResponseEntity.ok(authenticationService.confirmedEmail(request));
    }
    @PostMapping("/auth/sendUuidToUser")
    public ResponseEntity<AppUserResponseDto> sendUuidToUser(
            @RequestBody AppUserRequestDto request
    ) throws AppUserException, ConnectException {
        return  ResponseEntity.ok(authenticationService.sendUuidToUser(request));
    }
    @PostMapping("/auth/changePassWord")
    public ResponseEntity<AppUserResponseDto> changePassWord(
            @RequestBody AppUserRequestDto request
    ) throws AppUserException {
        return  ResponseEntity.ok(authenticationService.changePassWord(request));
    }
    @PostMapping("/auth/validUser")
    public ResponseEntity<AppUserResponseDto> validUser(
            @RequestBody AppUserRequestDto request
    ) throws AppUserException {
        return  ResponseEntity.ok(authenticationService.validUser(request));
    }
    @GetMapping("/auth/not")
    public ResponseEntity<String> test(){
        return ResponseEntity.ok("hello");
    }
    @GetMapping("/yes")
    public ResponseEntity<String> test2(){
        return ResponseEntity.ok("hello");
    }

}
