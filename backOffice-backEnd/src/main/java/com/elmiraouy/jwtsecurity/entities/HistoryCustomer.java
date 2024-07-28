package com.elmiraouy.jwtsecurity.entities;

import jakarta.persistence.*;

import lombok.*;

import java.util.Date;

@Entity
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class HistoryCustomer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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

    private String nameNew;
    private String passwordNew;
    private String emailNew;
    private String phoneNew;
    private String addressNew;
    private String uuidNew;
    private String villeNew;
    private Date expiredUuidNew;
    private Long activeHubIdNew ;
    private boolean allowedDailySumUpNew;
    private boolean allowedShutdownNew;
    private boolean allowedPhaseChangeNew;
    private boolean allowedBudgetAlertNew;
    private boolean allowedAutoMeterReadingNew;
    @ManyToOne
    @JoinColumn(name ="customer_id")
    private Customer customer;

}
