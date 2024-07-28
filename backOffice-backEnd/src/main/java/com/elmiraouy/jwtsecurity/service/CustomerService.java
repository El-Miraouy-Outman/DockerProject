package com.elmiraouy.jwtsecurity.service;

import com.elmiraouy.jwtsecurity.criteria.CustomerCriteria;
import com.elmiraouy.jwtsecurity.Dto.request.CustomerRequestDto;
import com.elmiraouy.jwtsecurity.Dto.response.CustomerResponseDto;

import java.util.List;

public interface CustomerService {
    public CustomerResponseDto add(CustomerRequestDto customerRequestDto);
    public CustomerResponseDto update(Long id,CustomerRequestDto customerRequestDto);
    public CustomerResponseDto delete(Long id);
    public CustomerResponseDto findByEmail(String email);
    public CustomerResponseDto findById(Long id);

    public List<CustomerResponseDto> findAll();

    public List<CustomerResponseDto>  findByCriteria(CustomerCriteria customerCriteria);
    public List<CustomerResponseDto> findCustomerHouse(CustomerCriteria customerCriteria);
}
