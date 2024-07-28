package com.elmiraouy.jwtsecurity.Dto.request;

import lombok.Data;

@Data
public class HouseDto {
    private String name;
    private String serialNumber;
    private String provider;
    private double currentMonthEnergy;
    private double currentMonthPrice;
    private double currentMonthIndex;
    private boolean isActive;
}
