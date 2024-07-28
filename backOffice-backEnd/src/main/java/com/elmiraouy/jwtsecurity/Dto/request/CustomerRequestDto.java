package com.elmiraouy.jwtsecurity.Dto.request;

import com.elmiraouy.jwtsecurity.entities.AppUser;
import com.elmiraouy.jwtsecurity.entities.Ticket;
import jakarta.persistence.OneToMany;
import lombok.Data;

import java.util.Collection;
import java.util.Date;
@Data

public class CustomerRequestDto {
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
}
