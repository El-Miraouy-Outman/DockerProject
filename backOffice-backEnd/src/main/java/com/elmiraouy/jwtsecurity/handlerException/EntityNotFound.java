package com.elmiraouy.jwtsecurity.handlerException;

public class EntityNotFound extends RuntimeException{
    public EntityNotFound(String msg){
        super(msg);
    }
}
