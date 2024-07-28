package com.elmiraouy.jwtsecurity.controller;

import com.elmiraouy.jwtsecurity.criteria.CustomerCriteria;
import com.elmiraouy.jwtsecurity.Dto.response.CustomerResponseDto;
import com.elmiraouy.jwtsecurity.service.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
@RequestMapping("/api/customers")
public class CustomerController {
    private final CustomerService customerService;

    @GetMapping
    public ResponseEntity<List<CustomerResponseDto>> findAllCustomers( )  {
        return ResponseEntity.ok(customerService.findAll());
    }
    @GetMapping("/findByCriteria")
    public ResponseEntity<List<CustomerResponseDto>> findCustomerByEmail(
            @RequestParam(name = "email",required = false) String email,
            @RequestParam(name = "phone_number",required = false) String phone
    )  {
        System.out.println("===== email ==== "+email);
        CustomerCriteria customerCriteria=CustomerCriteria.builder()
                .email(email).phone_number(phone).build();
        return ResponseEntity.ok(customerService.findByCriteria(customerCriteria));
    }
    @GetMapping("/findHouseCustomer")
    public ResponseEntity<CustomerResponseDto> findHouseCustomer(
            @RequestParam(name = "mail",required = false) String email,
            @RequestParam(name = "phone_number",required = false) String phone
    )  {
        if ("undefined".equals(email)) {
            email = null;
        }
        if ("undefined".equals(phone)) {
            phone = null;
        }
        System.out.println("===== mail ==== "+email);
        System.out.println("===== phone_number ==== "+phone);
        CustomerCriteria customerCriteria=CustomerCriteria.builder()
                .email(email).phone_number(phone).build();
        List<CustomerResponseDto> customers= customerService.findCustomerHouse(customerCriteria);
        if (customers.isEmpty()) {
            System.out.println("not found customers");
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(customers.get(0));
    }

}
