package com.elmiraouy.jwtsecurity.handlerException;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler({AppUserException.class})
    public ResponseEntity<?> handleException(Exception exception){
        return ResponseEntity
                .badRequest()
                .body(exception.getMessage());
    }
    @ExceptionHandler(EntityNotFound.class)
    public ResponseEntity<?> entityNotFoundException(Exception exception){
        return ResponseEntity
                .badRequest()
                .body(exception.getMessage());
    }
}
