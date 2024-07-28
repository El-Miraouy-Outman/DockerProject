package com.elmiraouy.jwtsecurity.mappers;

import com.elmiraouy.jwtsecurity.Dto.request.AppUserRequestDto;
import com.elmiraouy.jwtsecurity.Dto.response.AppUserResponseDto;
import com.elmiraouy.jwtsecurity.entities.AppUser;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class AppUserDtoMapper implements Function<AppUser, AppUserResponseDto> {

    @Override
    public AppUserResponseDto apply(AppUser appUser) {
        return new AppUserResponseDto(
                appUser.getId(),
                appUser.getFirstName(),
                appUser.getLastName(),
                appUser.getEmail(),
                appUser.getAddress(),
                appUser.getTelephone(),
                appUser.getVille(),
                appUser.getAppRole().getCode()
        );
    }

    public AppUserResponseDto appUserToDto(AppUser appUser){
        System.out.println("role :"+appUser.getAppRole().getRoleName());
        return  new AppUserResponseDto(
                appUser.getId(),
                appUser.getFirstName(),
                appUser.getLastName(),
                appUser.getEmail(),
                appUser.getToken().getAccessToken(),
                appUser.getToken().getRefreshToken(),
                appUser.getAddress(),
                appUser.getTelephone(),
                appUser.getVille(),
                appUser.getAppRole().getRoleName(),
                appUser.getComments()
        );
    }
    public AppUserResponseDto appUserToDtoGeneral(AppUser appUser){
        return  new AppUserResponseDto(
                appUser.getId(),
                appUser.getFirstName(),
                appUser.getLastName(),
                appUser.getEmail(),
                appUser.getAddress(),
                appUser.getTelephone(),
                appUser.getVille(),
                appUser.getComments()
        );
    }
    public AppUser appUserDtoToRequest(AppUserRequestDto appUserRequestDto){
        return   AppUser.builder()
                .address(appUserRequestDto.getAddress())
                .ville(appUserRequestDto.getVille())
                .email(appUserRequestDto.getEmail())
                .build();
    }
}
