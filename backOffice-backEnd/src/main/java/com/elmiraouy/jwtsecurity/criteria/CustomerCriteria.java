package com.elmiraouy.jwtsecurity.criteria;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CustomerCriteria {
    private String email;
    private String phone_number;

}
