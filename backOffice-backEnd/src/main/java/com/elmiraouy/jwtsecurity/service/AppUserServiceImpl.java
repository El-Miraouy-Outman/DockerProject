package com.elmiraouy.jwtsecurity.service;

import com.elmiraouy.jwtsecurity.Dto.request.AppUserRequestDto;
import com.elmiraouy.jwtsecurity.Dto.response.AppUserResponseDto;
import com.elmiraouy.jwtsecurity.entities.AppRole;
import com.elmiraouy.jwtsecurity.entities.AppUser;
import com.elmiraouy.jwtsecurity.entities.Comment;
import com.elmiraouy.jwtsecurity.entities.Token;
import com.elmiraouy.jwtsecurity.handlerException.AppUserException;
import com.elmiraouy.jwtsecurity.handlerException.EntityNotFound;
import com.elmiraouy.jwtsecurity.handlerException.EntityNotFoundException;
import com.elmiraouy.jwtsecurity.mappers.AppUserDtoMapper;
import com.elmiraouy.jwtsecurity.repository.AppUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AppUserServiceImpl implements AppUserService {

    private final AppUserRepository appUserRepository;
    private final AppUserDtoMapper appUserDtoMapper;

    @Override
    public List<AppUserResponseDto> findAllUser() {
                return appUserRepository.findAll().stream().map(appUserDtoMapper).toList();

    }

    @Override
    public AppUserResponseDto findByEmail(String email) throws  EntityNotFoundException {
        AppUser user=appUserRepository.findByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException(
                        "User With id [%s] not found".formatted(email)));
        return appUserDtoMapper.appUserToDto(user);
    }
    @Override
    public AppUserResponseDto findById(Long id) throws AppUserException {
        AppUser appUser=appUserRepository.findAppUserById(id)
                .orElseThrow(() -> new AppUserException(
                        "User With id [%s] not ".formatted(id)));
       return appUserDtoMapper.appUserToDto(appUser);

    }

    @Override
    public AppUserResponseDto add(AppUserRequestDto userRequestDto) {
        return null;
    }

    @Override
    public AppUserResponseDto deleteUser(Long id) {
        return null;
    }

    @Override
    public AppUserResponseDto update(Long id, AppUserRequestDto userRequestDto) throws AppUserException {
        AppUser user=appUserRepository.findById(id)
                .orElseThrow(() -> new AppUserException(
                        "User With id [%s] not ".formatted(id)));
        return null;
    }

    @Override
    public void addTokenToUser(AppUser appUser, Token token) throws AppUserException {

        AppUser appUser1=appUserRepository.findByEmail(appUser.getEmail()).orElseThrow(() -> new AppUserException(
                "User With Email: [%s] not ".formatted(appUser.getEmail())));
        appUser1.setToken(token);
        appUserRepository.save(appUser1);
    }


    @Override
    public AppUser addCommentToUser(Long idUser, Comment comment) {
        AppUser user = appUserRepository.findById(idUser).orElseThrow(() -> new EntityNotFound(
                "Customer With id [%s] not found".formatted(idUser))
        );
        user.getComments().add(comment);
        return appUserRepository.save(user);
    }


}
