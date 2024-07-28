package com.elmiraouy.jwtsecurity.Dto.response;

import com.elmiraouy.jwtsecurity.entities.AppUser;
import com.elmiraouy.jwtsecurity.entities.Ticket;
import lombok.Data;

import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Data
public class CustomerResponseDto {
    private Long id ;
    private String name;
    private String password;
    private String email;
    private String phone;
    private String address;
    private String uuid;
    private String ville;
    private Date expiredUuid;
    private Long activeHubId ;
    private boolean allowedDailySumUp;
    private boolean allowedShutdown;
    private boolean allowedPhaseChange;
    private boolean allowedBudgetAlert;
    private boolean allowedAutoMeterReading;
    private Collection<AppUser> users;
    private Collection<Ticket> tickets;
    private Map<String,String> housesNames ;


}
