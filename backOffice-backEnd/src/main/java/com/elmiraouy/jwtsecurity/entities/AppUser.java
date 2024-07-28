package com.elmiraouy.jwtsecurity.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;

@Entity

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AppUser implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id ;

    private String firstName;
    private String lastName;
    private String password;
    private String email;
    private String telephone;
    private String address;
    private String uuid;
    private String ville;
    private Date uuidExpiredDate;
    private String status ;
    private String imageUrl;

    @ManyToOne
    private AppRole appRole;
    @OneToOne(cascade = CascadeType.ALL)
    @Builder.Default
    private Token token=new Token();
    @ManyToMany(mappedBy = "users")
    private Collection<Customer> customers;
    @ManyToMany(mappedBy = "users")
    private Collection<Hub> hubs;
    @OneToMany(mappedBy = "user")
    private Collection<Ticket> tickets;
    @OneToMany(mappedBy = "user",fetch = FetchType.LAZY)
    @JsonIgnore
    private Collection<Comment> comments;

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }
    public AppUser(Long id, String firstName, String lastName, String passWord, String email, String telephone, String address, String uuid,String ville) {
        this.id=id;
        this.firstName=firstName;
        this.lastName=lastName;
        this.password=passWord;
        this.email=email;
        this.telephone=telephone;
        this.address=address;
        this.ville=ville;
        this.uuid=uuid;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<SimpleGrantedAuthority> authorities = new ArrayList<>();

            authorities.add(new SimpleGrantedAuthority(appRole.getCode()));

        return authorities;
    }


    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
