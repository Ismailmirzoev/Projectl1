package com.example.projecti.dto;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class ProductShortDto {
    private Long id;
    private String name;
    private BigDecimal price;
    private String imageUrl;
    private String categoryName;
}