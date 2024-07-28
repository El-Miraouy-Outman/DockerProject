package com.elmiraouy.jwtsecurity.service;

import com.elmiraouy.jwtsecurity.criteria.CustomerCriteria;
import com.elmiraouy.jwtsecurity.Dto.request.CustomerRequestDto;
import com.elmiraouy.jwtsecurity.Dto.response.CustomerResponseDto;
import com.elmiraouy.jwtsecurity.entities.Customer;
import com.elmiraouy.jwtsecurity.handlerException.EntityNotFound;
import com.elmiraouy.jwtsecurity.mappers.CustomerDtoMapper;
import com.elmiraouy.jwtsecurity.repository.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService {

    private final CustomerRepository customerRepository;
    private final CustomerDtoMapper customerDtoMapper;

    @Override
    public CustomerResponseDto add(CustomerRequestDto customerRequestDto) {

        return null;
    }

    @Override
    public CustomerResponseDto update(Long id, CustomerRequestDto customerRequestDto) {
        return null;
    }

    @Override
    public CustomerResponseDto delete(Long id) {
        return null;
    }

    @Override
    public CustomerResponseDto findByEmail(String email) {
        Customer customerByEmail = customerRepository.findByEmail(email);
        if(customerByEmail ==null ){
            throw new EntityNotFound(" Customer with this email %s  not exist".formatted(email));
        }
        return customerDtoMapper.apply(customerByEmail);
    }

    @Override
    public CustomerResponseDto findById(Long id) {
        Customer customer = customerRepository.findById(id).orElseThrow(
                () -> new EntityNotFound(" Customer with this email %s  not exist".formatted(id))
        );
        return customerDtoMapper.apply(customer);
    }

    @Override
    public List<CustomerResponseDto> findAll() {
       return customerRepository.findAll()
               .stream().map(customerDtoMapper)
               .collect(Collectors.toList());
    }

    @Override
    public List<CustomerResponseDto> findByCriteria(CustomerCriteria customerCriteria) {

        return customerRepository.findByCriteria(customerCriteria.getEmail(),customerCriteria.getPhone_number())
                .stream().map(customerDtoMapper)
                .collect(Collectors.toList());
    }

    @Override
    public List<CustomerResponseDto> findCustomerHouse(CustomerCriteria customerCriteria) {
         return findByCriteria(customerCriteria);
    }
}
