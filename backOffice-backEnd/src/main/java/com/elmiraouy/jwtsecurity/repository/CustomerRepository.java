package com.elmiraouy.jwtsecurity.repository;
import com.elmiraouy.jwtsecurity.entities.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CustomerRepository  extends JpaRepository<Customer,Long> {

    @Query("select c from Customer c where upper( c.email) = upper(:email) ")
    public Customer findByEmail(@Param("email") String email);

    @Query("""
         select c from Customer  c
         where  (upper(:email) IS NULL OR upper(c.email) = upper(:email))
         or (:phoneNumber IS NULL OR c.phone_number = :phoneNumber)
         """)
    List<Customer> findByCriteria(
            @Param("email") String email,
            @Param("phoneNumber") String phoneNumber);
}
