package com.elmiraouy.jwtsecurity.mappers;

import com.elmiraouy.jwtsecurity.Dto.request.CustomerRequestDto;
import com.elmiraouy.jwtsecurity.Dto.response.CustomerResponseDto;
import com.elmiraouy.jwtsecurity.entities.Customer;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class CustomerDtoMapper implements Function<Customer, CustomerResponseDto> {


    @Override
    public CustomerResponseDto apply(Customer customer) {
        CustomerResponseDto customerResponseDto = new CustomerResponseDto();
        customerResponseDto.setId(customer.getId());
        customerResponseDto.setName(customer.getName());
        customerResponseDto.setPassword(customer.getPassword());
        customerResponseDto.setEmail(customer.getEmail());
        customerResponseDto.setPhone(customer.getPhone_number());
        customerResponseDto.setAddress(customer.getAddress());
        customerResponseDto.setUuid(customer.getUuid());
        customerResponseDto.setVille(customer.getVille());
        customerResponseDto.setExpiredUuid(customer.getExpiredUuid());
        customerResponseDto.setActiveHubId(customer.getActiveHubId());
        customerResponseDto.setAllowedDailySumUp(customer.isAllowedDailySumUp());
        customerResponseDto.setAllowedShutdown(customer.isAllowedShutdown());
        customerResponseDto.setAllowedPhaseChange(customer.isAllowedPhaseChange());
        customerResponseDto.setAllowedBudgetAlert(customer.isAllowedBudgetAlert());
        customerResponseDto.setAllowedAutoMeterReading(customer.isAllowedAutoMeterReading());
        //customerResponseDto.setUsers(customer.getUsers());
        //customerResponseDto.setTickets(customer.getTickets());
        customerResponseDto.setHousesNames(customer.getHouses());
        return customerResponseDto;
    }

    public Customer customerRequestDtoToCustomer(CustomerRequestDto customerRequestDto) {
        Customer customer = new Customer();
        customer.setId(customer.getId());
        customer.setName(customerRequestDto.getName());
        customer.setPassword(customerRequestDto.getPassword());
        customer.setEmail(customerRequestDto.getEmail());
        customer.setPhone_number(customerRequestDto.getPhone());
        customer.setAddress(customerRequestDto.getAddress());
        customer.setUuid(customerRequestDto.getUuid());
        customer.setVille(customerRequestDto.getVille());
        customer.setExpiredUuid(customerRequestDto.getExpiredUuid());
        customer.setActiveHubId(customerRequestDto.getActiveHubId());
        customer.setAllowedDailySumUp(customerRequestDto.isAllowedDailySumUp());
        customer.setAllowedShutdown(customerRequestDto.isAllowedShutdown());
        customer.setAllowedPhaseChange(customerRequestDto.isAllowedPhaseChange());
        customer.setAllowedBudgetAlert(customerRequestDto.isAllowedBudgetAlert());
        customer.setAllowedAutoMeterReading(customerRequestDto.isAllowedAutoMeterReading());
        customer.setUsers(customerRequestDto.getUsers());
        customer.setTickets(customerRequestDto.getTickets());
        //customer.setHousesNames(customerRequestDto.getHouses());

        return customer;

    }


}
