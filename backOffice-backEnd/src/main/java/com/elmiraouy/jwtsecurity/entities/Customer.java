package com.elmiraouy.jwtsecurity.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "customers")
@Builder
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id ;
    private String name;
    private String password;
    private String email;
    private String phone_number;
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

    @ManyToMany
    @JsonIgnore
    private Collection<AppUser> users;

    @OneToMany(mappedBy = "customer",fetch = FetchType.EAGER)
    @JsonIgnore
    private Collection<Ticket> tickets;
    @OneToMany(mappedBy = "customer")
    @JsonIgnore
    private Collection<HistoryCustomer> listHistoryCustomers;
    @ManyToMany
    @JoinTable(name = "customers_hubs",
            joinColumns = @JoinColumn(name = "customer_id"),
            inverseJoinColumns = @JoinColumn(name = "hubs_id"))
    @JsonIgnore
    private Collection<Hub> hubs;

    @ElementCollection
    @CollectionTable(name = "customer_house_names",
            joinColumns = @JoinColumn(name = "customer_id"))
    @MapKeyColumn(name = "house_names_key")
    @Builder.Default
    private Map<String,String> housesNames = new HashMap<>();

    public Map<String, String> getHouses() {
        return housesNames;
    }

    public void setHouses(Map<String, String> houses) {
        this.housesNames = houses;
    }
}
