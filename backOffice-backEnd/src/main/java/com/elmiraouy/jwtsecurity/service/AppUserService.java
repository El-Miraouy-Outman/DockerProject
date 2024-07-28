package com.elmiraouy.jwtsecurity.service;

import com.elmiraouy.jwtsecurity.Dto.request.AppUserRequestDto;
import com.elmiraouy.jwtsecurity.Dto.response.AppUserResponseDto;
import com.elmiraouy.jwtsecurity.entities.AppUser;
import com.elmiraouy.jwtsecurity.entities.Comment;
import com.elmiraouy.jwtsecurity.entities.Token;
import com.elmiraouy.jwtsecurity.handlerException.AppUserException;
import com.elmiraouy.jwtsecurity.handlerException.EntityNotFoundException;

import java.util.List;

public interface AppUserService {
    public List<AppUserResponseDto> findAllUser();
    public AppUserResponseDto findByEmail(String email) throws AppUserException, EntityNotFoundException;
    public AppUserResponseDto findById(Long id) throws AppUserException;
    public AppUserResponseDto add(AppUserRequestDto userRequestDto);
    public AppUserResponseDto deleteUser(Long id);
    public AppUserResponseDto update(Long id , AppUserRequestDto userRequestDto) throws AppUserException;
    public void addTokenToUser(AppUser appUser, Token token) throws AppUserException;
    public AppUser addCommentToUser(Long idUser, Comment comment);

}
